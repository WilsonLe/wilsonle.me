'use client'

import {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type PointerEvent,
} from 'react'
import Image from 'next/image'
import { trackPortfolio } from '@/analytics/portfolio-events'
import { TechStackCarousel } from '@/components/TechStackCarousel'
import { getContactLinks } from '@/content/contact'
import type { HomeContent } from '@/content/types'
import type { DescentCopy } from '@/content/en/descent'
import { works, type Work } from '@/content/work'
import { DescentProjectDetails, projectScreenId } from '@/components/game/DescentProjectDetails'
import {
  billboardFloorY,
  createGame,
  fitCity,
  landPlayer,
  nearbyBillboard,
  nearestLandingInView,
  stepGame,
  zoneAt,
  PLAYER_HEIGHT,
  PLAYER_WIDTH,
  ROOFTOP_PLAYER_X,
  type Billboard,
  type CityLayout,
  type Platform,
  type SoundEvent,
  type Zone,
} from '@/components/game/descent-engine'
import { createControls, moveKey, type MoveKey } from '@/components/game/descent-input'
import {
  CROSSINGS,
  drawGame,
  drawForeground,
  type CrossingTops,
} from '@/components/game/descent-renderer'

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
const SCROLL_IDLE_MS = 500
const WORK_DISTRICTS = ['streets', 'transit', 'sewers'] as const

const DIRECTIONS = [
  ['up', '↑', 'W', 'Jump or activate jetpack'],
  ['left', '←', 'A', 'Move left'],
  ['down', '↓', 'S', 'Drop through ledges'],
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
  const projectEntry = useRef<'deep_link' | 'billboard' | 'nearby' | 'keyboard'>('deep_link')
  const viewedProject = useRef<{ id: string; time: number } | null>(null)
  const visitedDistricts = useRef(new Set<Zone>())
  const usedMovementControls = useRef(false)
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
    (
      id: string,
      work: Work | undefined,
      trigger: HTMLElement | null,
      entry: typeof projectEntry.current = 'keyboard',
    ) => {
      controls.reset()
      projectTrigger.current = trigger
      projectEntry.current = entry
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
    const guidePad = guide?.querySelector('.descent-guide-pad')
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
      !guidePad ||
      !work ||
      !contact ||
      !skills
    )
      return
    const deck = world.querySelector<HTMLElement>('[data-crossing="streets"]')
    const station = world.querySelector<HTMLElement>('[data-crossing="transit"]')
    const drains = world.querySelector<HTMLElement>('[data-crossing="sewers"]')
    const bulkhead = world.querySelector<HTMLElement>('[data-crossing="reactor"]')
    if (!deck || !station || !drains || !bulkhead) return
    const crossings = { streets: deck, transit: station, sewers: drains, reactor: bulkhead }
    const contactAnchors = Array.from(
      contact.querySelectorAll<HTMLAnchorElement>('a[data-contact-id]'),
    )
    const ctx = canvas.getContext('2d', { alpha: false })
    const foregroundCtx = foreground.getContext('2d')
    setPlaying(Boolean(ctx && foregroundCtx))
    trackPortfolio('city_ready', { target: ctx && foregroundCtx ? 'canvas' : 'static' })
    const completedMoves = new Set<SoundEvent>()

    const state = createGame(1200)
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const touch = window.matchMedia('(pointer: coarse)')
    const horizontalTouchPad = window.matchMedia(
      '(orientation: landscape) and (min-width: 560px) and (max-height: 550px)',
    )
    let scale = 1
    let viewHeight = 800
    let viewportWidth = 0
    let viewportHeight = 0
    let headerHeight = 0
    let guidePadY = 0
    let following = false
    let scrollTop = scroller.scrollTop
    let wheelScroll: { position: number; target: number } | undefined
    let scrollLanding: { at: number; resizing?: true } | 'landed' | undefined
    let paintedCamera = -1
    let paintedVisibility = -1
    let paintedMotion = motion.matches
    let sceneryTime = 0
    let paintedSceneryTime = 0
    let lastSceneryPaint = 0
    let visibility = 1
    let showTouchPad = false
    let workLedge: Platform | undefined
    let workRowHeight = 0
    let contactFloor: Platform | undefined
    let contactApproachHeight = 0
    let interactionTargets: Billboard[] = []
    let crossingTops: CrossingTops | undefined
    let framedDestination: 'work' | 'skills' | undefined
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
        ? nearbyBillboard(state, interactionTargets)
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
      const contactPrompt = contactAnchors.some((anchor) => anchor.dataset.contactId === nearby)
      const promptY = centerY + (contactPrompt ? 12 : 0)
      const inset = contactPrompt ? 110 : 78
      const aboveTouchPad =
        showTouchPad && (viewportWidth < 700 || touch.matches) && promptY > viewportHeight - 132
      let promptX = besidePlayer
      if (aboveTouchPad) {
        promptX = horizontalTouchPad.matches
          ? Math.min(viewportWidth - 208, promptX)
          : Math.max(208, promptX)
      }
      const x = Math.max(inset, Math.min(viewportWidth - inset, promptX))
      const y = Math.max(90, Math.min(viewportHeight - 26, promptY))
      const transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
      if (transform !== promptTransform.current) {
        promptTransform.current = transform
        if (promptRef.current) promptRef.current.style.transform = transform
      }
    }
    const writeScroll = (top: number) => {
      scroller.scrollTop = top
      scrollTop = scroller.scrollTop
    }
    const clampScroll = (top: number) =>
      Math.max(0, Math.min(scroller.scrollHeight - viewportHeight, top))
    const cancelScrollLanding = () => {
      wheelScroll = undefined
      scrollLanding = undefined
    }
    const stopForManualScroll = () => {
      cancelScrollLanding()
      following = false
      framedDestination = undefined
      travel = null
      visibility = 1
      controls.reset()
    }
    const contactLandingInset = () => {
      const preferred = viewportWidth < 700 || touch.matches ? 130 : 27
      const approachHeight = Math.max(contactApproachHeight, PLAYER_HEIGHT * scale)
      return Math.min(preferred, Math.max(0, viewportHeight - headerHeight - approachHeight - 12))
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
    const landInView = (keepScrollPosition = false) => {
      const top = state.camera + headerHeight / scale
      const bottom = state.camera + viewHeight
      const pad = scroller.parentElement
        ?.querySelector('.descent-touch-pad')
        ?.getBoundingClientRect()
      let obstruction
      if (pad?.width) {
        const viewport = scroller.getBoundingClientRect()
        // The rendered jetpack extends past the player's collision box.
        const clearance = 10
        obstruction = {
          left: (pad.left - viewport.left) / scale - clearance,
          right: (pad.right - viewport.left) / scale + clearance,
          top: state.camera + (pad.top - viewport.top - 2) / scale,
        }
      }

      const landing = nearestLandingInView(state, top, bottom, obstruction)
      if (!landing || (keepScrollPosition && landing.shift)) return false
      const { center, feet, shift } = landing
      landPlayer(state, center, feet)
      if (shift) {
        const target = scrollTop + shift * scale
        writeScroll(shift < 0 ? Math.floor(target) : Math.ceil(target))
        state.camera = scrollTop / scale
      }
      state.started = true
      paintedCamera = -1
      publish()
      return true
    }
    const resize = () => {
      if (scroller.clientWidth <= 0 || scroller.clientHeight <= 0) return
      const onContactFloor =
        state.started &&
        state.player.grounded &&
        !travel &&
        !wheelScroll &&
        scrollLanding === undefined &&
        playerVisible() &&
        contactFloor !== undefined &&
        Math.abs(state.player.y + PLAYER_HEIGHT - contactFloor.y) < 1
      viewportWidth = scroller.clientWidth
      viewportHeight = scroller.clientHeight
      headerHeight = header.offsetHeight
      const compact = viewportWidth < 700
      const width = compact ? 600 : 1200
      scale = viewportWidth / width
      viewHeight = viewportHeight / scale
      const bounds = world.getBoundingClientRect()
      const worldY = (edge: number) => (edge - bounds.top) / scale
      const y = (element: HTMLElement) => worldY(element.getBoundingClientRect().top)
      const guideBottom = guide.getBoundingClientRect().bottom
      guidePadY = guidePad.getBoundingClientRect().top - bounds.top
      const measure = (element: HTMLElement, id: string): Billboard => {
        const rect = element.getBoundingClientRect()
        return {
          id,
          x: (rect.left - bounds.left) / scale,
          y: worldY(rect.top),
          width: rect.width / scale,
          height: rect.height / scale,
        }
      }
      const boards = Array.from(work.querySelectorAll<HTMLElement>('[data-project-id]'))
      const skillsBillboard = measure(skills, skills.id)
      // Leave room for the idle arrow above the sprite as the canvas scales.
      const guideGap = Math.max(compact ? 50 : 76, (PLAYER_HEIGHT + 22) * scale)
      const guideRoof = worldY(
        Math.max(hero.getBoundingClientRect().bottom - 10, guideBottom + guideGap),
      )
      const playerLeft = width * ROOFTOP_PLAYER_X - PLAYER_WIDTH / 2
      const roof =
        skillsBillboard.x + skillsBillboard.width > playerLeft
          ? Math.min(guideRoof, skillsBillboard.y - 8 / scale)
          : guideRoof
      const billboards = boards.map((element) => measure(element, element.dataset.projectId!))
      const contactTargets = contactAnchors.map((anchor) =>
        measure(anchor, anchor.dataset.contactId!),
      )
      interactionTargets = [...billboards, ...contactTargets]
      const tops = {} as CrossingTops
      const districtStarts = {} as CrossingTops
      for (const zone of CROSSINGS) {
        const rect = crossings[zone].getBoundingClientRect()
        tops[zone] = Math.round(worldY(rect.top))
        districtStarts[zone] = Math.round(worldY(rect.bottom))
      }
      crossingTops = tops
      const floorGap = Math.max(16, (PLAYER_HEIGHT - 10) * scale)
      const floor = worldY(contact.getBoundingClientRect().bottom + floorGap)
      contact.style.setProperty('--contact-floor-gap', `${floorGap}px`)
      const firstContact = contactTargets[0]
      contactApproachHeight = firstContact ? (floor - firstContact.y) * scale : 0
      contactFloor = {
        x: firstContact?.x ?? width * 0.1,
        y: floor,
        width: firstContact?.width ?? 0,
      }
      const first = billboards[0]
      const workTop = y(work)
      const firstRowBottom = first
        ? Math.max(
            ...billboards
              .filter((board) => board.y === first.y)
              .map((board) => board.y + board.height),
          )
        : workTop
      workRowHeight = (firstRowBottom - workTop) * scale
      const firstLedge = first && {
        x: first.x,
        y: billboardFloorY(firstRowBottom),
        width: first.width,
      }
      const workAwning =
        firstLedge && (firstLedge.y - workTop) * scale + headerHeight + 51 > viewportHeight
          ? { ...firstLedge, y: first.y - 9, rowBottom: firstRowBottom }
          : undefined
      workLedge = workAwning ?? firstLedge
      const layout: CityLayout = {
        height: bounds.height / scale,
        floor,
        ceiling: (headerHeight + 10) / scale,
        roof,
        ...districtStarts,
        workTop,
        workAwning,
        skillsBillboard,
        billboards,
      }
      fitCity(state, width, layout)
      const expectedScroll = Math.min(scrollTop, scroller.scrollHeight - viewportHeight)
      if (Math.abs(scroller.scrollTop - expectedScroll) > 0.5) framedDestination = undefined
      if (framedDestination) {
        writeScroll(targetScroll(framedDestination))
        landAtSection(framedDestination)
      } else if (onContactFloor) {
        const link = contactTargets.find((target) => target.id === lastNearby)
        const center = state.player.x + PLAYER_WIDTH / 2
        const keepLink = link && (center < link.x + 1 || center > link.x + link.width - 1)
        landPlayer(state, keepLink ? link.x + link.width / 2 : center, floor)
        const feet = floor * scale
        const minScroll = feet - viewportHeight + contactLandingInset()
        const maxScroll = feet - PLAYER_HEIGHT * scale - headerHeight - 12
        writeScroll(Math.max(minScroll, Math.min(maxScroll, scroller.scrollTop)))
      }
      boards.forEach((element, index) => {
        const board = billboards[index]
        element.dataset.district = zoneAt(layout, board.y + board.height / 2)
      })
      scrollTop = scroller.scrollTop
      if (wheelScroll) {
        wheelScroll.position = scrollTop
        wheelScroll.target = clampScroll(wheelScroll.target)
      }
      state.camera = scrollTop / scale
      if (scrollLanding === 'landed' || scrollLanding?.resizing) {
        // Responsive layout can settle across several measurements.
        scrollLanding = landInView(true)
          ? 'landed'
          : { at: performance.now() + SCROLL_IDLE_MS, resizing: true }
      }
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
    const sections = { top: hero, work, contact, skills }
    const arrivalLedge = (destination: Destination) => {
      if (destination === 'work') return workLedge
      if (destination === 'contact') return contactFloor
    }
    const targetScroll = (destination: Destination) => {
      if (destination === 'top') return 0
      const section = sections[destination].getBoundingClientRect()
      const origin = scroller.scrollTop - scroller.getBoundingClientRect().top
      const top = origin + section.top
      const anchor = top - headerHeight - 24
      const feet = arrivalLedge(destination)?.y
      const landingInset = destination === 'contact' ? contactLandingInset() : 27
      const showLanding = feet === undefined ? 0 : feet * scale - viewportHeight + landingInset
      const rooftop = (state.layout.roof - PLAYER_HEIGHT) * scale - headerHeight - 8
      const preferred =
        destination === 'skills' ? Math.min(anchor, rooftop) : Math.max(anchor, showLanding)
      const bottom = destination === 'work' ? top + workRowHeight : origin + section.bottom
      // Keep the heading clear even when a short viewport needs scrolling to see the whole board.
      const target =
        destination === 'contact'
          ? preferred
          : Math.min(top - headerHeight - 8, Math.max(preferred, bottom - viewportHeight + 8))
      return clampScroll(target)
    }
    const landAtSection = (destination: Destination) => {
      paintedCamera = -1
      const ledge = arrivalLedge(destination)
      if (destination === 'top' || !ledge) {
        landPlayer(state, state.width * ROOFTOP_PLAYER_X, state.layout.roof)
        state.started = destination !== 'top'
        if (destination === 'top') showTouchPad = false
      } else {
        landPlayer(state, ledge.x + ledge.width / 2, ledge.y)
        state.started = true
      }
    }
    const arrive = (destination: Destination) => {
      landAtSection(destination)
      framedDestination =
        destination === 'skills' || destination === 'work' ? destination : undefined
      sections[destination].querySelector<HTMLElement>('h1, h2')?.focus({ preventScroll: true })
    }
    navigateRef.current = (destination) => {
      cancelScrollLanding()
      following = false
      framedDestination = undefined
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
        if (!sameProject) projectEntry.current = 'deep_link'
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
      const active = document.activeElement
      if (active instanceof HTMLAnchorElement && contactAnchors.includes(active)) {
        scroller.focus({ preventScroll: true })
      }
      cancelScrollLanding()
      if (!following || scroller.scrollTop !== scrollTop) {
        scrollTop = scroller.scrollTop
        state.camera = scrollTop / scale
        if (!playerVisible()) landInView()
      }
      following = true
      framedDestination = undefined
      if (!usedMovementControls.current) {
        usedMovementControls.current = true
        trackPortfolio('city_started', {
          target: direction,
          input: touch ? 'touch' : source.startsWith('pointer:') ? 'pointer' : 'keyboard',
        })
      }
      state.started = true
      controls.press(source, direction, at, touch)
    }
    pressRef.current = ctx && foregroundCtx ? press : null

    // Pressing an arrow can make a clicked control match :focus-visible.
    let browsingWithTab = false
    const onPointerDown = () => {
      if (!selectedRef.current) browsingWithTab = false
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (
        selectedRef.current ||
        event.defaultPrevented ||
        event.metaKey ||
        event.ctrlKey ||
        event.altKey
      )
        return
      if (event.key === 'Tab') {
        browsingWithTab = true
        controls.reset()
        return
      }
      const target = event.target instanceof HTMLElement ? event.target : null
      if (target?.closest('input, textarea, select, [contenteditable], dialog')) return
      const inSkills = target?.closest('.tech-carousel')
      const direction = moveKey(event.code)
      if (direction && pressRef.current) {
        if (event.code === 'Space') {
          if (event.shiftKey || inSkills || target?.closest('button, summary')) return
        } else if (
          browsingWithTab &&
          target &&
          (inSkills ||
            (target.closest('a, button, summary') &&
              !target.closest('.descent-direction-pad, .descent-interact')))
        ) {
          // Keep native scrolling available while tabbing through portfolio content.
          return
        }
        event.preventDefault()
        if (!event.repeat && !travel) {
          // Once movement starts, horizontal arrows should no longer browse the Skills tabs.
          if (inSkills) scroller.focus({ preventScroll: true })
          press(event.code, direction, event.timeStamp)
        }
      } else if (!inSkills && event.code === 'KeyE' && !event.repeat) {
        if (
          target instanceof HTMLAnchorElement &&
          (contactAnchors.includes(target) ||
            (target === promptRef.current && target.hasAttribute('data-contact-prompt')))
        ) {
          event.preventDefault()
          target.click()
          return
        }
        const id = inspectable()
        if (id) {
          event.preventDefault()
          const contactLink = contactAnchors.find((anchor) => anchor.dataset.contactId === id)
          if (contactLink) contactLink.click()
          else
            showProject(
              id,
              works.find((item) => item.projectId === id),
              promptRef.current,
            )
        }
      }
    }
    const onKeyUp = (event: KeyboardEvent) => controls.release(event.code)
    const onWheel = (event: WheelEvent) => {
      if (
        selectedRef.current ||
        motion.matches ||
        !event.cancelable ||
        event.ctrlKey ||
        event.metaKey ||
        event.altKey ||
        event.shiftKey
      )
        return

      const mode = event.deltaMode
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return
      const unit =
        mode === WheelEvent.DOM_DELTA_LINE
          ? 16
          : mode === WheelEvent.DOM_DELTA_PAGE
            ? viewportHeight
            : 1
      const position = scroller.scrollTop
      const previousTarget = wheelScroll?.target ?? position
      const target = clampScroll(previousTarget + event.deltaY * unit)
      event.preventDefault()
      if (target === previousTarget) return
      if (!wheelScroll) stopForManualScroll()
      wheelScroll = { position: wheelScroll?.position ?? position, target }
    }
    const clearInput = () => controls.reset()
    const observer = new ResizeObserver(resize)
    for (const element of [scroller, world, header, hero, guide, skills, work, contact])
      observer.observe(element)
    resize()
    scroller.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('pointerdown', onPointerDown, true)
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
      // The browser can clamp scroll as the world shrinks before ResizeObserver runs.
      const observedScroll = scroller.scrollTop
      if (
        scroller.clientWidth !== viewportWidth ||
        scroller.clientHeight !== viewportHeight ||
        (observedScroll < scrollTop && Math.abs(observedScroll - clampScroll(scrollTop)) < 0.5)
      ) {
        resize()
      }
      const dt = Math.min((now - previous) / 1000, 0.045)
      previous = now
      const actualScroll = scroller.scrollTop
      if (actualScroll !== scrollTop) {
        stopForManualScroll()
        scrollTop = actualScroll
        scrollLanding = { at: now + SCROLL_IDLE_MS }
      }
      if (selectedRef.current) {
        if (scrollLanding !== 'landed') cancelScrollLanding()
        if (travel) stopForManualScroll()
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
        if (wheelScroll) {
          const { position, target } = wheelScroll
          const distance = target - position
          wheelScroll.position =
            motion.matches || Math.abs(distance) <= 1
              ? target
              : position + distance * (1 - Math.exp(-dt * 22))
          const previousScroll = scrollTop
          writeScroll(wheelScroll.position)
          if (scrollTop !== previousScroll) scrollLanding = { at: now + SCROLL_IDLE_MS }
          if (wheelScroll.position === target) wheelScroll = undefined
        }
        state.camera = scrollTop / scale
        if (
          !wheelScroll &&
          scrollLanding &&
          scrollLanding !== 'landed' &&
          now >= scrollLanding.at
        ) {
          scrollLanding = ctx && foregroundCtx && landInView() ? 'landed' : undefined
        }
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
      if (
        ctx &&
        crossingTops &&
        (cameraChanged || (!reducedMotion && now - lastSceneryPaint >= 32))
      ) {
        drawGame(ctx, state, viewHeight, sceneryTime, crossingTops)
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
      for (const event of state.events) {
        if (audio) playNote(audio, event)
        if (!completedMoves.has(event)) {
          completedMoves.add(event)
          trackPortfolio('city_move', { target: event })
        }
      }
      state.events.length = 0
      if (scrollTop + headerHeight + 18 >= guidePadY) showTouchPad = true
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
      scroller.removeEventListener('wheel', onWheel)
      window.removeEventListener('pointerdown', onPointerDown, true)
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
    if (viewedProject.current?.id !== selected) {
      const previous = viewedProject.current
      const now = performance.now()
      if (previous) {
        trackPortfolio('project_closed', {
          target: previous.id,
          duration_ms: Math.round(now - previous.time),
        })
      }
      viewedProject.current = { id: selected, time: now }
      trackPortfolio('project_opened', { target: selected, surface: projectEntry.current })
    }
    scrollProject(dialog, fragment())
  }, [selected])

  useEffect(() => {
    if (!ready || visitedDistricts.current.has(snapshot.zone)) return
    visitedDistricts.current.add(snapshot.zone)
    trackPortfolio('district_reached', { target: snapshot.zone })
  }, [ready, snapshot.zone])

  const toggleSound = () => {
    if (sound) {
      void audioRef.current?.suspend()
    } else {
      audioRef.current ??= new AudioContext()
      const audio = audioRef.current
      void audio.resume().then(() => playNote(audio, 'jump'))
    }
    setSound(!sound)
    trackPortfolio('sound_changed', { target: sound ? 'off' : 'on' })
  }
  const openProject = (event: MouseEvent<HTMLAnchorElement>, id: string, work?: Work) => {
    if (!isUnmodifiedClick(event)) return
    event.preventDefault()
    const entry = event.currentTarget === promptRef.current ? 'nearby' : 'billboard'
    showProject(id, work, event.currentTarget, entry)
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
    if (viewedProject.current) {
      trackPortfolio('project_closed', {
        target: viewedProject.current.id,
        duration_ms: Math.round(performance.now() - viewedProject.current.time),
      })
      viewedProject.current = null
    }
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
  const contactLinks = getContactLinks(content.siteSettings)
  const nearbyContact = contactLinks.find((link) => link.id === nearbyId)
  const nearbyProject = content.projects.items.find((item) => item.id === nearbyId)
  const nearbyWork = nearbyProject && works.find((item) => item.projectId === nearbyProject.id)
  const action = nearbyProject
    ? {
        href: '#' + (nearbyWork?.slug || nearbyProject.id),
        text: copy.viewProject,
        label: copy.viewProject + ': ' + (nearbyWork?.name || nearbyProject.name) + ' (E)',
      }
    : nearbyContact && {
        href: nearbyContact.href,
        text: nearbyContact.text,
        label: nearbyContact.text + ' (E)',
      }
  const projectsPerDistrict = Math.ceil(content.projects.items.length / WORK_DISTRICTS.length)
  const billboards = content.projects.items.map((item) => {
    const work = works.find((entry) => entry.projectId === item.id)
    const screen = work?.screens[0]
    const name = work?.name || item.name
    return (
      <article
        key={item.id}
        data-project-id={item.id}
        data-approached={nearbyId === item.id}
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
  })

  return (
    <div
      className="descent-page"
      data-ready={ready}
      data-started={snapshot.started}
      data-zone={snapshot.zone}
      data-nearby={nearbyId}
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
      <header
        ref={headerRef}
        className="descent-header"
        role="banner"
        data-portfolio-surface="city_header"
      >
        <a
          href="#descent-title"
          className="descent-identity"
          data-portfolio-action="navigation_clicked"
          data-portfolio-target="top"
          onClick={(event) => navigate(event, 'top')}
          aria-label={content.siteSettings.name + ', back to top'}
        >
          {content.siteSettings.name}
          <span aria-hidden="true">.</span>
        </a>
        <nav className="descent-nav" aria-label="Portfolio sections">
          <a
            href="#work"
            data-portfolio-action="navigation_clicked"
            data-portfolio-target="work"
            onClick={(event) => navigate(event, 'work')}
          >
            {content.siteSettings.navigation.work}
          </a>
          <a
            href="#contact"
            data-portfolio-action="navigation_clicked"
            data-portfolio-target="contact"
            onClick={(event) => navigate(event, 'contact')}
          >
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
        data-portfolio-scroll=""
        tabIndex={0}
        role="region"
        aria-label={copy.regionLabel}
      >
        <div ref={worldRef} className="descent-world">
          <div className="descent-rooftop">
            <section
              ref={heroRef}
              className="descent-hero descent-sign"
              data-portfolio-surface="hero"
              data-portfolio-view="intro"
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
                  data-portfolio-action="navigation_clicked"
                  data-portfolio-target="work"
                  onClick={(event) => navigate(event, 'work')}
                >
                  {content.hero.workCta}
                  <span aria-hidden="true">↓</span>
                </a>
                <a
                  className="descent-outline-link"
                  href={content.siteSettings.resumeUrl}
                  download
                  data-portfolio-action="resume_clicked"
                >
                  {content.hero.resumeCta}
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </section>

            <aside
              ref={guideRef}
              hidden={ready && !playing}
              className="descent-control-guide"
              data-portfolio-view="controls"
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
            <h2 id="tech-stack-heading" tabIndex={-1} className="mb-3" data-portfolio-view="skills">
              {content.hero.stack.heading}
            </h2>
            <TechStackCarousel stack={content.hero.stack} />
          </section>

          <div className="descent-crossing" data-crossing="streets" aria-hidden="true" />

          <section
            ref={workRef}
            id="descent-work"
            className="descent-work"
            aria-labelledby="descent-work-title"
          >
            <header className="descent-work-sign descent-sign" data-portfolio-view="work">
              <h2 id="descent-work-title" tabIndex={-1}>
                {content.projects.heading}
              </h2>
            </header>
            <div className="descent-projects">
              {WORK_DISTRICTS.map((district, index) => (
                <Fragment key={district}>
                  {district !== 'streets' && (
                    <div className="descent-crossing" data-crossing={district} aria-hidden="true" />
                  )}
                  <div className="descent-project-row">
                    {billboards.slice(
                      index * projectsPerDistrict,
                      (index + 1) * projectsPerDistrict,
                    )}
                  </div>
                </Fragment>
              ))}
            </div>
          </section>

          <div className="descent-crossing" data-crossing="reactor" aria-hidden="true" />

          <section
            ref={contactRef}
            id="descent-contact"
            className="descent-contact descent-billboard"
            data-portfolio-surface="contact_billboard"
            data-portfolio-view="contact"
            aria-labelledby="descent-contact-title"
          >
            <div className="descent-billboard-lights" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
            <h2 id="descent-contact-title" tabIndex={-1}>
              {content.siteSettings.navigation.contact}
            </h2>
            <div className="descent-contact-links">
              {contactLinks.map((link) => (
                <a
                  key={link.id}
                  className="descent-outline-link"
                  data-contact-id={link.id}
                  data-portfolio-action="contact_clicked"
                  data-portfolio-target={link.id.replace('contact-', '')}
                  data-approached={nearbyId === link.id}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-keyshortcuts="E"
                >
                  {link.text}
                  <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </section>

          <footer
            className="descent-world-footer"
            role="contentinfo"
            data-portfolio-surface="city_footer"
            data-portfolio-view="footer"
          >
            <span>
              © {new Date().getFullYear()} {content.siteSettings.name}
            </span>
            <div className="descent-footer-links">
              <a
                href="#skills"
                data-portfolio-action="navigation_clicked"
                data-portfolio-target="skills"
                onClick={(event) => navigate(event, 'skills')}
              >
                {content.hero.stack.heading}
              </a>
              <a
                href="#descent-title"
                data-portfolio-action="navigation_clicked"
                data-portfolio-target="top"
                onClick={(event) => navigate(event, 'top')}
              >
                {copy.backToTop}
                <span aria-hidden="true">↑</span>
              </a>
            </div>
          </footer>
        </div>
      </div>

      {action && (
        <a
          key={nearbyContact ? 'contact' : 'project'}
          ref={mountPrompt}
          href={action.href}
          className="descent-interact"
          data-contact-prompt={nearbyContact ? '' : undefined}
          data-portfolio-action={nearbyContact ? 'contact_clicked' : undefined}
          data-portfolio-target={nearbyContact?.id.replace('contact-', '')}
          data-portfolio-surface="nearby"
          target={nearbyContact ? '_blank' : undefined}
          rel={nearbyContact ? 'noreferrer' : undefined}
          aria-haspopup={nearbyProject ? 'dialog' : undefined}
          aria-label={action.label}
          aria-keyshortcuts="E"
          onClick={
            nearbyProject ? (event) => openProject(event, nearbyProject.id, nearbyWork) : undefined
          }
        >
          <kbd aria-hidden="true">E</kbd>
          <span>{action.text}</span>
          <span aria-hidden="true">↗</span>
        </a>
      )}

      {playing && directionalButtons()}

      <dialog
        ref={dialogRef}
        className="descent-dialog"
        data-portfolio-surface="project_dialog"
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
