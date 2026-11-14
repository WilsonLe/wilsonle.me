'use client'

import { useCallback, useEffect, useRef, useState, type MouseEvent, type PointerEvent } from 'react'
import Image from 'next/image'
import { TechStackCarousel } from '@/components/TechStackCarousel'
import type { HomeContent } from '@/content/types'
import type { DescentCopy } from '@/content/en/descent'
import { works, type Work } from '@/content/work'
import { DescentProjectDetails, projectScreenId } from '@/components/game/DescentProjectDetails'
import {
  billboardLedgeY,
  createGame,
  fitCity,
  landPlayer,
  nearbyBillboard,
  stepGame,
  zoneAt,
  PLAYER_HEIGHT,
  PLAYER_WIDTH,
  type CityLayout,
  type Platform,
  type SoundEvent,
  type Zone,
} from '@/components/game/descent-engine'
import { createControls, moveKey, type MoveKey } from '@/components/game/descent-input'
import { drawGame, drawForeground } from '@/components/game/descent-renderer'

type Snapshot = {
  x: number
  y: number
  started: boolean
  jetpack: boolean
  showTouchPad: boolean
  zone: Zone
}
const INITIAL: Snapshot = {
  x: 0,
  y: 0,
  started: false,
  jetpack: false,
  showTouchPad: false,
  zone: 'skyline',
}

type Destination = 'top' | 'work' | 'contact' | 'skills'
const FADE_MS = 180
const SCROLL_MS = 440

const DIRECTIONS = [
  ['up', '↑', 'W', 'Jump or activate jetpack'],
  ['left', '←', 'A', 'Move left'],
  ['down', '↓', 'S', 'Drop through platform'],
  ['right', '→', 'D', 'Move right'],
] as const

function fragment() {
  try {
    return decodeURIComponent(window.location.hash.slice(1))
  } catch {
    return ''
  }
}

function projectForFragment(hash: string) {
  return works.find(
    (work) =>
      work.slug === hash || work.screens.some((screen) => projectScreenId(work, screen) === hash),
  )
}

function isUnmodifiedClick(event: MouseEvent<HTMLAnchorElement>) {
  return event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey
}

function scrollProject(dialog: HTMLDialogElement, hash: string) {
  const body = dialog.querySelector<HTMLElement>('.descent-dialog-body')
  if (!body) return
  const target = document.getElementById('descent-' + hash)
  body.scrollTop = target && body.contains(target) ? target.offsetTop : 0
}

const currentPath = () => window.location.pathname + window.location.search + window.location.hash

function KeyLabel({ arrow, letter }: { arrow: string; letter: string }) {
  return (
    <span className="descent-key-label" aria-hidden="true">
      <span>{arrow}</span>
      <span>{letter}</span>
    </span>
  )
}

function bindDirectionPad(pad: HTMLDivElement | null) {
  if (!pad) return
  // iOS can start text selection on a double tap even when the pointer default is canceled.
  const cancelControlTouch = (event: TouchEvent) => event.preventDefault()
  pad.addEventListener('touchstart', cancelControlTouch, { passive: false })
  return () => pad.removeEventListener('touchstart', cancelControlTouch)
}

function playNote(context: AudioContext, event: SoundEvent) {
  if (context.state !== 'running') return
  const notes = { jump: [220, 440], jetpack: [196, 294, 440] }
  notes[event].forEach((frequency, index) => {
    const oscillator = context.createOscillator()
    const gain = context.createGain()
    const start = context.currentTime + index * 0.06
    oscillator.type = 'triangle'
    oscillator.frequency.setValueAtTime(frequency, start)
    gain.gain.setValueAtTime(0.035, start)
    gain.gain.exponentialRampToValueAtTime(0.001, start + 0.14)
    oscillator.connect(gain).connect(context.destination)
    oscillator.start(start)
    oscillator.stop(start + 0.15)
  })
}

export function DescentGame({ content, copy }: { content: HomeContent; copy: DescentCopy }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const foregroundRef = useRef<HTMLCanvasElement>(null)
  const headerRef = useRef<HTMLElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const worldRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLElement>(null)
  const guideRef = useRef<HTMLElement>(null)
  const skillsRef = useRef<HTMLElement>(null)
  const workRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)
  const promptRef = useRef<HTMLAnchorElement>(null)
  const promptTransform = useRef('')
  const dialogRef = useRef<HTMLDialogElement>(null)
  const audioRef = useRef<AudioContext | null>(null)
  const selectedRef = useRef<string | null>(null)
  const projectTrigger = useRef<HTMLElement | null>(null)
  const projectReturn = useRef<string | null>(null)
  const navigateRef = useRef<((destination: Destination) => void) | null>(null)
  const pressRef = useRef<
    ((source: string, direction: MoveKey, at: number, touch?: boolean) => void) | null
  >(null)
  const [controls] = useState(createControls)
  const [ready, setReady] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [sound, setSound] = useState(false)
  const [keys, setKeys] = useState<'touch' | 'arrows' | 'wasd'>('arrows')
  const [nearbyId, setNearbyId] = useState<string>()
  const [selected, setSelected] = useState<string | null>(null)
  const [snapshot, setSnapshot] = useState(INITIAL)
  const mountPrompt = useCallback((element: HTMLAnchorElement | null) => {
    promptRef.current = element
    if (element) element.style.transform = promptTransform.current
  }, [])
  const showProject = useCallback(
    (id: string, work: Work | undefined, trigger: HTMLElement | null) => {
      controls.reset()
      projectTrigger.current = trigger
      if (work && fragment() !== work.slug) {
        projectReturn.current = currentPath()
        window.history.pushState(
          { ...window.history.state, descentProjectReturn: projectReturn.current },
          '',
          '#' + work.slug,
        )
      }
      selectedRef.current = id
      setSelected(id)
    },
    [controls],
  )

  useEffect(() => {
    const canvas = canvasRef.current
    const foreground = foregroundRef.current
    const header = headerRef.current
    const scroller = scrollRef.current
    const world = worldRef.current
    const hero = heroRef.current
    const guide = guideRef.current
    const work = workRef.current
    const contact = contactRef.current
    const skills = skillsRef.current
    if (
      !canvas ||
      !foreground ||
      !header ||
      !scroller ||
      !world ||
      !hero ||
      !guide ||
      !work ||
      !contact ||
      !skills
    )
      return
    const ctx = canvas.getContext('2d', { alpha: false })
    const foregroundCtx = foreground.getContext('2d')
    setPlaying(Boolean(ctx && foregroundCtx))

    const state = createGame(1200)
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let scale = 1
    let viewHeight = 800
    let viewportWidth = 0
    let viewportHeight = 0
    let headerHeight = 0
    let guideBottomY = 0
    let following = false
    let scrollTop = scroller.scrollTop
    let paintedCamera = -1
    let paintedVisibility = -1
    let paintedMotion = motion.matches
    let sceneryTime = 0
    let paintedSceneryTime = 0
    let lastSceneryPaint = 0
    let visibility = 1
    let showTouchPad = false
    let workLedge: Platform | undefined
    let travel: {
      destination: Destination
      source: number
      start: number
      departure: number
      arrival: number
      duration: number
      opacity: number
      landed: boolean
    } | null = null
    let lastPublish = 0
    let lastSnapshot = INITIAL
    let lastNearby: string | undefined
    const playerVisible = () =>
      state.player.y - state.camera >= headerHeight / scale &&
      state.player.y + PLAYER_HEIGHT - state.camera <= viewHeight
    const inspectable = () =>
      ctx && foregroundCtx && !travel && state.started && playerVisible()
        ? nearbyBillboard(state)
        : undefined
    const positionPrompt = () => {
      const nearby = inspectable()
      if (nearby !== lastNearby) {
        lastNearby = nearby
        setNearbyId(nearby)
      }
      if (!nearby) return

      // Follow the same pixel-snapped coordinates as the foreground canvas.
      const centerX = Math.round(state.player.x + PLAYER_WIDTH / 2) * scale
      const centerY =
        ((Math.round(state.player.y - state.camera) + PLAYER_HEIGHT / 2) * viewportHeight) /
        Math.ceil(viewHeight)
      const besidePlayer = centerX + (centerX < viewportWidth / 2 ? 96 : -96)
      const aboveTouchPad = showTouchPad && centerY > viewportHeight - 132
      const x = Math.max(
        78,
        Math.min(viewportWidth - 78, aboveTouchPad ? Math.max(208, besidePlayer) : besidePlayer),
      )
      const y = Math.max(90, Math.min(viewportHeight - 26, centerY))
      const transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
      if (transform !== promptTransform.current) {
        promptTransform.current = transform
        if (promptRef.current) promptRef.current.style.transform = transform
      }
    }
    const publish = () => {
      const next: Snapshot = {
        x: Math.round(state.player.x),
        y: Math.round(state.player.y),
        started: state.started,
        jetpack: state.player.jetpack || state.player.exhaustUntil > state.time,
        showTouchPad,
        zone: zoneAt(state.layout, following ? state.player.y : state.camera + viewHeight * 0.45),
      }
      if (
        Object.keys(next).some(
          (key) => next[key as keyof Snapshot] !== lastSnapshot[key as keyof Snapshot],
        )
      ) {
        lastSnapshot = next
        setSnapshot(next)
      }
    }
    const resize = () => {
      if (scroller.clientWidth <= 0 || scroller.clientHeight <= 0) return
      viewportWidth = scroller.clientWidth
      viewportHeight = scroller.clientHeight
      headerHeight = header.offsetHeight
      const compact = viewportWidth < 700
      const width = compact ? 600 : 1200
      scale = viewportWidth / width
      viewHeight = viewportHeight / scale
      const bounds = world.getBoundingClientRect()
      const y = (element: HTMLElement) => (element.getBoundingClientRect().top - bounds.top) / scale
      const guideBottom = guide.getBoundingClientRect().bottom
      guideBottomY = guideBottom - bounds.top
      const roof =
        (Math.max(hero.getBoundingClientRect().bottom - 10, guideBottom + (compact ? 50 : 76)) -
          bounds.top) /
        scale
      const boards = Array.from(work.querySelectorAll<HTMLElement>('[data-project-id]'))
      const billboards = boards.map((element) => {
        const rect = element.getBoundingClientRect()
        return {
          id: element.dataset.projectId!,
          x: (rect.left - bounds.left) / scale,
          y: (rect.top - bounds.top) / scale,
          width: rect.width / scale,
          height: rect.height / scale,
        }
      })
      const rows = [...new Set(billboards.map((board) => Math.round(board.y)))].sort(
        (a, b) => a - b,
      )
      const streets = Math.max(roof + 25, y(work) - 45 / scale)
      const transit = Math.max(
        streets + 85,
        (rows[Math.ceil(rows.length / 3)] ?? streets + 380) - 28 / scale,
      )
      const sewers = Math.max(
        transit + 85,
        (rows[Math.ceil((rows.length * 2) / 3)] ?? transit + 330) - 28 / scale,
      )
      const contactBounds = contact.getBoundingClientRect()
      const contactHasSide = bounds.right - contactBounds.right >= viewportWidth * 0.24
      const contactLedge = {
        x: contactHasSide
          ? Math.max(width * 0.69, (contactBounds.right - bounds.left + 24) / scale)
          : width * 0.71,
        y: contactHasSide
          ? y(contact) + Math.min(136, viewportHeight * 0.35) / scale
          : (contactBounds.bottom - bounds.top + 44) / scale,
        width: width * 0.2,
      }
      const first = billboards[0]
      const firstLedge = first && { x: first.x, y: billboardLedgeY(first), width: first.width }
      const workAwning =
        firstLedge && (firstLedge.y - y(work)) * scale + headerHeight + 51 > viewportHeight
          ? { ...firstLedge, y: first.y - 9 }
          : undefined
      workLedge = workAwning ?? firstLedge
      const layout: CityLayout = {
        height: bounds.height / scale,
        ceiling: (headerHeight + 10) / scale,
        roof,
        streets,
        transit,
        sewers,
        reactor: Math.max(sewers + 100, y(contact) - 55 / scale),
        workAwning,
        contactLedge,
        billboards,
      }
      fitCity(state, width, layout)
      boards.forEach((element, index) => {
        const board = billboards[index]
        element.dataset.district = zoneAt(layout, board.y + board.height / 2)
      })
      scrollTop = scroller.scrollTop
      state.camera = scrollTop / scale
      for (const layer of [canvas, foreground]) {
        if (layer.width !== width) layer.width = width
        if (layer.height !== Math.ceil(viewHeight)) layer.height = Math.ceil(viewHeight)
      }
      if (ctx) ctx.imageSmoothingEnabled = false
      if (foregroundCtx) foregroundCtx.imageSmoothingEnabled = false
      paintedCamera = -1
      positionPrompt()
      publish()
    }
    const writeScroll = (top: number) => {
      scroller.scrollTop = top
      scrollTop = scroller.scrollTop
    }
    const sections = { top: hero, work, contact, skills }
    const arrivalLedge = (destination: Destination) => {
      if (destination === 'work') return workLedge
      if (destination === 'contact') return state.layout.contactLedge
    }
    const targetScroll = (destination: Destination) => {
      if (destination === 'top') return 0
      const offset =
        sections[destination].getBoundingClientRect().top - scroller.getBoundingClientRect().top
      const anchor = scroller.scrollTop + offset - headerHeight - 24
      const feet = arrivalLedge(destination)?.y
      const showLanding = feet === undefined ? 0 : feet * scale - viewportHeight + 27
      const rooftop = (state.layout.roof - PLAYER_HEIGHT) * scale - headerHeight - 8
      const target =
        destination === 'skills' ? Math.min(anchor, rooftop) : Math.max(anchor, showLanding)
      return Math.max(0, Math.min(scroller.scrollHeight - viewportHeight, target))
    }
    const arrive = (destination: Destination) => {
      paintedCamera = -1
      const ledge = arrivalLedge(destination)
      if (destination === 'top' || !ledge) {
        landPlayer(state, state.width * 0.81, state.layout.roof)
        state.started = destination !== 'top'
        if (destination === 'top') showTouchPad = false
      } else {
        landPlayer(state, ledge.x + ledge.width / 2, ledge.y)
        state.started = true
      }
      sections[destination].querySelector<HTMLElement>('h1, h2')?.focus({ preventScroll: true })
    }
    navigateRef.current = (destination) => {
      following = false
      controls.reset()
      if (motion.matches) {
        travel = null
        writeScroll(targetScroll(destination))
        state.camera = scrollTop / scale
        arrive(destination)
        visibility = 1
      } else {
        const source = scroller.scrollTop
        const departure = playerVisible() ? FADE_MS * visibility : 0
        const duration = Math.abs(source - targetScroll(destination)) < 2 ? 0 : SCROLL_MS
        travel = {
          destination,
          source,
          start: performance.now(),
          departure,
          duration,
          arrival: departure + duration,
          opacity: visibility,
          landed: false,
        }
        scrollTop = source
      }
      positionPrompt()
      publish()
    }
    const syncLocation = () => {
      const hash = fragment()
      const work = projectForFragment(hash)
      controls.reset()
      if (work) {
        projectReturn.current = window.history.state?.descentProjectReturn ?? null
        const sameProject = selectedRef.current === work.projectId
        selectedRef.current = work.projectId
        setSelected(work.projectId)
        if (sameProject && dialogRef.current?.open) scrollProject(dialogRef.current, hash)
      } else {
        const returningFromProject = projectReturn.current === currentPath()
        projectReturn.current = null
        selectedRef.current = null
        setSelected(null)
        dialogRef.current?.close()
        if (returningFromProject) return
        if (hash === 'work' || hash === 'contact' || hash === 'skills') navigateRef.current?.(hash)
        else if (!hash || hash === 'descent-title') navigateRef.current?.('top')
      }
    }
    const press = (source: string, direction: MoveKey, at: number, touch?: boolean) => {
      if (selectedRef.current || travel) return
      if (!following && !playerVisible()) {
        const top = state.camera + (headerHeight + 12) / scale
        const bottom = state.camera + viewHeight - 75 / scale
        const ledge = state.platforms.find(
          (platform) => platform.y - PLAYER_HEIGHT >= top && platform.y <= bottom,
        )
        if (ledge) landPlayer(state, ledge.x + ledge.width / 2, ledge.y)
        else landPlayer(state, state.width * 0.81, state.camera + viewHeight * 0.56)
      }
      following = true
      state.started = true
      controls.press(source, direction, at, touch)
    }
    pressRef.current = ctx && foregroundCtx ? press : null

    const onKeyDown = (event: KeyboardEvent) => {
      if (selectedRef.current || event.metaKey || event.ctrlKey || event.altKey) return
      if (
        event.target instanceof HTMLElement &&
        event.target.closest('input, textarea, select, [contenteditable], dialog, .tech-carousel')
      )
        return
      const direction = moveKey(event.code)
      if (direction && pressRef.current) {
        const target = event.target instanceof HTMLElement ? event.target : null
        if (event.code === 'Space') {
          if (event.shiftKey || event.defaultPrevented || target?.closest('button, summary')) return
        } else if (
          target?.matches(':focus-visible') &&
          target.closest('a, button, summary') &&
          !target.closest('.descent-direction-pad, .descent-interact')
        ) {
          // Let focused portfolio links and controls keep their native scrolling keys.
          return
        }
        event.preventDefault()
        if (!event.repeat) press(event.code, direction, event.timeStamp)
      } else if (event.code === 'KeyE' && !event.repeat) {
        const id = inspectable()
        if (id) {
          event.preventDefault()
          const work = works.find((item) => item.projectId === id)
          showProject(id, work, promptRef.current)
        }
      }
    }
    const onKeyUp = (event: KeyboardEvent) => controls.release(event.code)
    const clearInput = () => controls.reset()
    const observer = new ResizeObserver(resize)
    for (const element of [scroller, world, header, hero, guide, work, contact])
      observer.observe(element)
    resize()
    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    window.addEventListener('hashchange', syncLocation)
    window.addEventListener('blur', clearInput)
    document.addEventListener('visibilitychange', clearInput)

    // Skills is present on first paint. Finish the jump before visitors can focus its controls.
    if (fragment() === 'skills') {
      writeScroll(targetScroll('skills'))
      state.camera = scrollTop / scale
      arrive('skills')
      publish()
    }

    let frame = 0
    let previous = performance.now()
    let accumulator = 0
    const render = (now: number) => {
      const dt = Math.min((now - previous) / 1000, 0.045)
      previous = now
      if ((travel && selectedRef.current) || Math.abs(scroller.scrollTop - scrollTop) > 0.5) {
        following = false
        travel = null
        visibility = 1
        controls.reset()
        scrollTop = scroller.scrollTop
      }
      if (travel) {
        accumulator = 0
        const elapsed = Math.max(0, now - travel.start)
        if (elapsed < travel.departure) {
          visibility = travel.opacity * (1 - elapsed / travel.departure)
        } else if (elapsed < travel.arrival) {
          visibility = 0
          const progress = (elapsed - travel.departure) / travel.duration
          const eased = progress * progress * (3 - 2 * progress)
          writeScroll(travel.source + (targetScroll(travel.destination) - travel.source) * eased)
        } else {
          if (!travel.landed) {
            writeScroll(targetScroll(travel.destination))
            state.camera = scrollTop / scale
            arrive(travel.destination)
            travel.landed = true
          }
          visibility = Math.min(1, (elapsed - travel.arrival) / FADE_MS)
          if (visibility === 1) {
            travel = null
            publish()
          }
        }
        state.camera = scrollTop / scale
      } else if (!following) {
        state.camera = scroller.scrollTop / scale
        accumulator = 0
      } else if (!selectedRef.current) {
        accumulator += dt
        while (accumulator >= 1 / 120) {
          stepGame(state, controls.next(now), 1 / 120, viewHeight)
          accumulator -= 1 / 120
        }
        writeScroll(state.camera * scale)
      } else accumulator = 0
      const animating = travel || (following && !selectedRef.current)
      const reducedMotion = motion.matches
      const cameraChanged = state.camera !== paintedCamera
      // Keep the last visible pose when reduced motion is turned on.
      sceneryTime = reducedMotion ? paintedSceneryTime : sceneryTime + dt
      if (ctx && (cameraChanged || (!reducedMotion && now - lastSceneryPaint >= 32))) {
        drawGame(ctx, state, viewHeight, sceneryTime)
        paintedSceneryTime = sceneryTime
        lastSceneryPaint = now
      }
      if (
        foregroundCtx &&
        (cameraChanged ||
          visibility !== paintedVisibility ||
          reducedMotion !== paintedMotion ||
          (!reducedMotion && now - lastPublish > 65) ||
          animating)
      ) {
        drawForeground(foregroundCtx, state, viewHeight, now / 1000, reducedMotion, visibility)
      }
      paintedCamera = state.camera
      paintedVisibility = visibility
      paintedMotion = reducedMotion
      const audio = audioRef.current
      if (audio) state.events.forEach((event) => playNote(audio, event))
      state.events.length = 0
      if (scrollTop + headerHeight + 18 >= guideBottomY) showTouchPad = true
      positionPrompt()
      if (now - lastPublish > 65) {
        publish()
        lastPublish = now
      }
      frame = requestAnimationFrame(render)
    }
    frame = requestAnimationFrame(render)
    return () => {
      navigateRef.current = null
      pressRef.current = null
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
      window.removeEventListener('hashchange', syncLocation)
      window.removeEventListener('blur', clearInput)
      document.removeEventListener('visibilitychange', clearInput)
      void audioRef.current?.close()
      audioRef.current = null
    }
  }, [controls, showProject])

  useEffect(() => {
    setReady(true)
    const hash = fragment()
    const work = projectForFragment(hash)
    if (work) {
      projectReturn.current = window.history.state?.descentProjectReturn ?? null
      selectedRef.current = work.projectId
      setSelected(work.projectId)
    }
    const frame = requestAnimationFrame(() => {
      if (hash === 'work' || hash === 'contact') navigateRef.current?.(hash)
    })
    return () => cancelAnimationFrame(frame)
  }, [])

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const touchGuide = window.matchMedia('(pointer: coarse), (max-width: 699px)')
    let timer: number
    const update = () => {
      window.clearInterval(timer)
      setKeys(touchGuide.matches ? 'touch' : 'arrows')
      if (!touchGuide.matches && !motion.matches) {
        timer = window.setInterval(
          () => setKeys((value) => (value === 'wasd' ? 'arrows' : 'wasd')),
          2700,
        )
      }
    }
    update()
    motion.addEventListener('change', update)
    touchGuide.addEventListener('change', update)
    return () => {
      window.clearInterval(timer)
      motion.removeEventListener('change', update)
      touchGuide.removeEventListener('change', update)
    }
  }, [])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!selected || !dialog) return
    if (!dialog.open) dialog.showModal()
    scrollProject(dialog, fragment())
  }, [selected])

  const toggleSound = () => {
    if (sound) {
      void audioRef.current?.suspend()
    } else {
      audioRef.current ??= new AudioContext()
      const audio = audioRef.current
      void audio.resume().then(() => playNote(audio, 'jump'))
    }
    setSound(!sound)
  }
  const openProject = (event: MouseEvent<HTMLAnchorElement>, id: string, work?: Work) => {
    if (!isUnmodifiedClick(event)) return
    event.preventDefault()
    showProject(id, work, event.currentTarget)
  }
  const navigate = (event: MouseEvent<HTMLAnchorElement>, destination: Destination) => {
    if (!navigateRef.current || !isUnmodifiedClick(event)) return
    event.preventDefault()
    const href =
      destination === 'top' ? window.location.pathname + window.location.search : '#' + destination
    if (destination === 'top' ? Boolean(window.location.hash) : fragment() !== destination) {
      window.history.pushState(window.history.state, '', href)
    }
    navigateRef.current(destination)
  }
  const closeProject = () => {
    if (dialogRef.current?.open) return
    const currentProject = selectedRef.current
    selectedRef.current = null
    setSelected(null)
    controls.reset()
    if (currentProject && projectForFragment(fragment())?.projectId === currentProject) {
      if (projectReturn.current) window.history.back()
      else {
        window.history.replaceState(window.history.state, '', '#work')
        navigateRef.current?.('work')
      }
    }
    if (projectTrigger.current?.isConnected) projectTrigger.current.focus({ preventScroll: true })
    projectTrigger.current = null
  }
  const pointerDown = (direction: MoveKey, event: PointerEvent<HTMLButtonElement>) => {
    if (event.button !== 0) return
    event.preventDefault()
    event.currentTarget.setPointerCapture(event.pointerId)
    pressRef.current?.(
      'pointer:' + event.pointerId,
      direction,
      event.timeStamp,
      event.pointerType === 'touch',
    )
  }
  const pointerUp = (event: PointerEvent<HTMLButtonElement>) =>
    controls.release('pointer:' + event.pointerId)
  const directionalButtons = (tutorial = false) => (
    <div
      ref={bindDirectionPad}
      className={`descent-direction-pad ${tutorial ? 'descent-guide-pad' : 'descent-touch-pad'}`}
      data-visible={tutorial || snapshot.showTouchPad}
      role="group"
      aria-label="Character movement"
    >
      {DIRECTIONS.map(([direction, arrow, letter, label]) => (
        <button
          key={direction}
          type="button"
          data-direction={direction}
          aria-label={label}
          onPointerDown={(event) => pointerDown(direction, event)}
          onPointerUp={pointerUp}
          onPointerCancel={pointerUp}
          onLostPointerCapture={pointerUp}
          onClick={(event) => {
            const nativeEvent = event.nativeEvent
            if (event.detail !== 0 || ('pointerType' in nativeEvent && nativeEvent.pointerType)) {
              return
            }
            pressRef.current?.('button:' + direction, direction, event.timeStamp)
            controls.release('button:' + direction)
          }}
        >
          {tutorial && keys !== 'touch' ? <KeyLabel arrow={arrow} letter={letter} /> : arrow}
        </button>
      ))}
    </div>
  )

  const project = content.projects.items.find((item) => item.id === selected)
  const showcase = works.find((item) => item.projectId === selected)
  const nearby = content.projects.items.find((item) => item.id === nearbyId)
  const nearbyName =
    nearby && (works.find((item) => item.projectId === nearby.id)?.name || nearby.name)
  const nearbyWork = nearby && works.find((item) => item.projectId === nearby.id)

  return (
    <div
      className="descent-page"
      data-ready={ready}
      data-started={snapshot.started}
      data-zone={snapshot.zone}
      data-nearby={nearby?.id}
      data-jetpack={snapshot.jetpack}
      data-player-x={snapshot.x}
      data-player-y={snapshot.y}
    >
      <canvas ref={canvasRef} className="descent-canvas" aria-hidden="true" />
      <canvas
        ref={foregroundRef}
        className="descent-canvas descent-foreground"
        aria-hidden="true"
      />
      <header ref={headerRef} className="descent-header" role="banner">
        <a
          href="#descent-title"
          className="descent-identity"
          onClick={(event) => navigate(event, 'top')}
          aria-label={content.siteSettings.name + ', back to top'}
        >
          {content.siteSettings.name}
          <span aria-hidden="true">.</span>
        </a>
        <nav className="descent-nav" aria-label="Portfolio sections">
          <a href="#work" onClick={(event) => navigate(event, 'work')}>
            {content.siteSettings.navigation.work}
          </a>
          <a href="#contact" onClick={(event) => navigate(event, 'contact')}>
            {content.siteSettings.navigation.contact}
          </a>
        </nav>
        <div className="descent-header-actions">
          <button
            className="descent-sound"
            onClick={toggleSound}
            aria-pressed={sound}
            aria-label={sound ? 'Turn sound off' : 'Turn sound on'}
          >
            <svg viewBox="0 0 20 20" aria-hidden="true">
              <path d="M2 7h4l5-4v14l-5-4H2z" fill="currentColor" />
              {sound ? (
                <path d="M14 6v8m3-11v14" fill="none" stroke="currentColor" strokeWidth="1.5" />
              ) : (
                <path d="m14 7 5 6m0-6-5 6" stroke="currentColor" strokeWidth="1.5" />
              )}
            </svg>
          </button>
        </div>
      </header>

      <div
        ref={scrollRef}
        className="descent-scrollport"
        tabIndex={0}
        role="region"
        aria-label={copy.regionLabel}
      >
        <div ref={worldRef} className="descent-world">
          <div className="descent-rooftop">
            <section
              ref={heroRef}
              className="descent-hero descent-sign"
              aria-labelledby="descent-title"
            >
              <p className="descent-eyebrow">{content.hero.identity}</p>
              <h1 id="descent-title" tabIndex={-1}>
                {content.hero.heading}
              </h1>
              <div className="descent-hero-cta">
                <a
                  className="descent-primary"
                  href="#work"
                  onClick={(event) => navigate(event, 'work')}
                >
                  {content.hero.workCta}
                  <span aria-hidden="true">↓</span>
                </a>
                <a className="descent-outline-link" href={content.siteSettings.resumeUrl} download>
                  {content.hero.resumeCta}
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </section>

            <aside
              ref={guideRef}
              hidden={ready && !playing}
              className="descent-control-guide"
              aria-label="City controls"
            >
              <h2>{copy.controls}</h2>
              <div className="descent-guide-layout" data-keys={keys === 'wasd' ? 'wasd' : 'arrows'}>
                {directionalButtons(true)}
                <p className="descent-guide-shortcut">
                  <span
                    className="descent-jetpack-keys"
                    role="img"
                    aria-label={keys === 'touch' ? 'Double tap Up' : 'Double tap Up or W'}
                  >
                    <kbd>{keys === 'touch' ? '↑' : <KeyLabel arrow="↑" letter="W" />}</kbd>
                    <kbd>{keys === 'touch' ? '↑' : <KeyLabel arrow="↑" letter="W" />}</kbd>
                  </span>
                  <span>{copy.jetpack}</span>
                </p>
              </div>
            </aside>
          </div>

          <section ref={skillsRef} id="skills" className="descent-skills descent-billboard">
            <div className="descent-billboard-lights" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
            <h2 id="tech-stack-heading" tabIndex={-1} className="mb-3">
              {content.hero.stack.heading}
            </h2>
            <TechStackCarousel stack={content.hero.stack} />
          </section>

          <section
            ref={workRef}
            id="descent-work"
            className="descent-work"
            aria-labelledby="descent-work-title"
          >
            <header className="descent-work-sign descent-sign">
              <h2 id="descent-work-title" tabIndex={-1}>
                {content.projects.heading}
              </h2>
            </header>
            <div className="descent-projects">
              {content.projects.items.map((item) => {
                const work = works.find((entry) => entry.projectId === item.id)
                const screen = work?.screens[0]
                const name = work?.name || item.name
                return (
                  <article
                    key={item.id}
                    data-project-id={item.id}
                    data-approached={nearby?.id === item.id}
                    className="descent-project descent-billboard"
                  >
                    <div className="descent-billboard-lights" aria-hidden="true">
                      <i />
                      <i />
                      <i />
                    </div>
                    {screen && <Image {...screen.image} alt={screen.image.alt} unoptimized />}
                    <div className="descent-billboard-copy">
                      <h3>
                        <a
                          href={'#' + (work?.slug || item.id)}
                          className="descent-project-button"
                          aria-haspopup="dialog"
                          aria-label={copy.viewProject + ': ' + name}
                          onClick={(event) => openProject(event, item.id, work)}
                        >
                          {name}
                          <span aria-hidden="true">↗</span>
                        </a>
                      </h3>
                      <p>{work?.summary || item.summary}</p>
                    </div>
                  </article>
                )
              })}
            </div>
          </section>

          <section
            ref={contactRef}
            id="descent-contact"
            className="descent-contact descent-sign"
            aria-labelledby="descent-contact-title"
          >
            <h2 id="descent-contact-title" tabIndex={-1}>
              {content.siteSettings.navigation.contact}
            </h2>
            <a className="descent-email" href={'mailto:' + content.siteSettings.email}>
              {content.siteSettings.email}
              <span aria-hidden="true">↗</span>
            </a>
            <a
              className="descent-outline-link"
              href={content.siteSettings.contact.booking.url}
              target="_blank"
              rel="noreferrer"
            >
              {content.siteSettings.contact.booking.text}
              <span aria-hidden="true">↗</span>
            </a>
            <div className="descent-socials">
              <a href={content.siteSettings.social?.github} target="_blank" rel="noreferrer">
                {content.siteSettings.socialLabels.github}
                <span aria-hidden="true">↗</span>
              </a>
              <a href={content.siteSettings.social?.linkedin} target="_blank" rel="noreferrer">
                {content.siteSettings.socialLabels.linkedin}
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          </section>

          <footer className="descent-world-footer" role="contentinfo">
            <span>
              © {new Date().getFullYear()} {content.siteSettings.name}
            </span>
            <div className="descent-footer-links">
              <a href="#skills" onClick={(event) => navigate(event, 'skills')}>
                {content.hero.stack.heading}
              </a>
              <a href="#descent-title" onClick={(event) => navigate(event, 'top')}>
                {copy.backToTop}
                <span aria-hidden="true">↑</span>
              </a>
            </div>
          </footer>
        </div>
      </div>

      {nearby && (
        <a
          ref={mountPrompt}
          href={'#' + (nearbyWork?.slug || nearby.id)}
          className="descent-interact"
          aria-haspopup="dialog"
          aria-label={copy.viewProject + ': ' + nearbyName + ' (E)'}
          aria-keyshortcuts="E"
          onClick={(event) => openProject(event, nearby.id, nearbyWork)}
        >
          <kbd aria-hidden="true">E</kbd>
          <span>{copy.viewProject}</span>
          <span aria-hidden="true">↗</span>
        </a>
      )}

      {playing && directionalButtons()}

      <dialog
        ref={dialogRef}
        className="descent-dialog"
        aria-labelledby="descent-dialog-title"
        onClose={closeProject}
      >
        {project && (
          <>
            <header className="descent-dialog-heading">
              <h2 id="descent-dialog-title">{showcase?.name || project.name}</h2>
              <button
                type="button"
                className="descent-dialog-close"
                aria-label={copy.closeProject}
                onClick={() => dialogRef.current?.close()}
              >
                ×
              </button>
            </header>
            <div className="descent-dialog-body">
              <DescentProjectDetails project={project} work={showcase} labels={content.projects} />
            </div>
          </>
        )}
      </dialog>
    </div>
  )
}
