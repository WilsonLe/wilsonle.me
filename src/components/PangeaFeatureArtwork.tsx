import { useId } from 'react'
import type { ShowcaseFeatureArtwork } from '@/content/types'

export function PangeaFeatureArtwork({ content }: { content: ShowcaseFeatureArtwork }) {
  const id = useId().replace(/:/g, '')
  const arrow = `${id}-arrow`

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 660"
      role="img"
      aria-labelledby={`${id}-title`}
      aria-describedby={`${id}-description`}
      className="feature-artwork block h-auto w-full rounded-2xl font-sans"
    >
      <title id={`${id}-title`}>{content.title}</title>
      <desc id={`${id}-description`}>{content.description}</desc>
      <defs>
        <marker
          id={arrow}
          viewBox="0 0 12 12"
          refX="10"
          refY="6"
          markerWidth="8"
          markerHeight="8"
          orient="auto-start-reverse"
        >
          <path d="M2 2 10 6 2 10" fill="none" stroke="var(--color-signal-deep)" strokeWidth="2" />
        </marker>
      </defs>
      <rect width="640" height="660" rx="24" fill="var(--color-pangea-lilac)" />
      <rect x="58" y="112" width="524" height="430" rx="24" fill="white" />

      {content.kind === 'chatbot' ? (
        <>
          <circle cx="100" cy="155" r="21" fill="var(--color-pangea-lilac)" />
          <path
            d="M89 151h22v13H98l-6 5v-5h-3z"
            fill="none"
            stroke="var(--color-ink)"
            strokeWidth="2"
          />
          <text x="140" y="164" fontSize="27" className="fill-ink">
            {content.partner}
          </text>
          <path d="M82 185H558" stroke="var(--color-ink)" strokeOpacity="0.12" />
          <rect x="82" y="205" width="476" height="54" rx="12" fill="var(--color-paper)" />
          <text x="320" y="240" textAnchor="middle" fontSize="24" className="fill-ink">
            {content.scenario}
          </text>

          <g className="feature-appear feature-stage-1">
            <rect x="82" y="285" width="350" height="56" rx="18" fill="var(--color-paper)" />
            <text x="102" y="320" fontSize="24" className="fill-ink">
              {content.messages[0]}
            </text>
          </g>
          <g className="feature-appear feature-stage-2">
            <rect
              x="202"
              y="358"
              width="356"
              height="56"
              rx="18"
              fill="var(--color-pangea-lilac)"
            />
            <text x="222" y="393" fontSize="24" className="fill-ink">
              {content.messages[1]}
            </text>
          </g>
          <g className="feature-appear feature-stage-3">
            <rect x="82" y="431" width="350" height="56" rx="18" fill="var(--color-paper)" />
            <text x="102" y="466" fontSize="24" className="fill-ink">
              {content.messages[2]}
            </text>
          </g>

          <g fill="none" stroke="var(--color-signal-deep)" strokeWidth="2.5" strokeLinecap="round">
            <ellipse
              className="feature-draw feature-stage-1"
              pathLength="1"
              cx="320"
              cy="232"
              rx="246"
              ry="38"
            />
            <path
              className="feature-draw feature-stage-1"
              pathLength="1"
              d="M355 66C475 49 580 83 558 202"
              markerEnd={`url(#${arrow})`}
            />
            <path
              className="feature-draw feature-stage-2"
              pathLength="1"
              d="M480 557C590 520 600 455 560 394"
              markerEnd={`url(#${arrow})`}
            />
            <path
              className="feature-draw feature-stage-3"
              pathLength="1"
              d="M252 608C136 600 97 558 116 489"
              markerEnd={`url(#${arrow})`}
            />
          </g>
          <g fontSize="26" className="fill-ink">
            <text x="42" y="66" className="feature-appear feature-stage-1">
              01 · {content.callouts[0]}
            </text>
            <text x="360" y="585" className="feature-appear feature-stage-2">
              02 · {content.callouts[1]}
            </text>
            <text x="42" y="636" className="feature-appear feature-stage-3">
              03 · {content.callouts[2]}
            </text>
          </g>
        </>
      ) : (
        <>
          <text x="84" y="160" fontSize="27" className="fill-ink">
            {content.heading}
          </text>
          <path d="M82 181H558" stroke="var(--color-ink)" strokeOpacity="0.12" />
          <text x="84" y="218" fontSize="24" className="fill-ink">
            {content.draft}
          </text>

          <g className="feature-appear feature-stage-1">
            <rect x="82" y="241" width="476" height="118" rx="16" fill="var(--color-ink)" />
            <text x="103" y="277" fontSize="24" fill="var(--color-paper)">
              {content.translationLabel}
            </text>
            {content.choices.map((choice, index) => (
              <g key={choice}>
                <rect
                  x={[102, 228, 419][index]}
                  y="297"
                  width={[114, 179, 119][index]}
                  height="43"
                  rx="10"
                  fill="var(--color-pangea-lilac)"
                />
                <text
                  x={[159, 317, 478][index]}
                  y="326"
                  textAnchor="middle"
                  fontSize="24"
                  className="fill-ink"
                >
                  {choice}
                </text>
              </g>
            ))}
          </g>
          <g className="feature-appear feature-stage-2">
            <rect
              x="82"
              y="389"
              width="476"
              height="129"
              rx="16"
              fill="var(--color-pangea-lilac)"
            />
            <text x="104" y="435" fontSize="29" className="fill-ink">
              {content.word}
            </text>
            <path d="M104 450H315" stroke="var(--color-ink)" strokeOpacity="0.15" />
            <text x="104" y="489" fontSize="25" className="fill-ink">
              {content.meaning}
            </text>
          </g>
          <g
            className="feature-appear feature-stage-3"
            fill="none"
            stroke="var(--color-ink)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="489" cy="441" r="31" fill="white" stroke="none" />
            <path d="M472 435h8l9-8v28l-9-8h-8zM497 434q7 7 0 14M504 428q13 13 0 26" />
          </g>

          <g fill="none" stroke="var(--color-signal-deep)" strokeWidth="2.5" strokeLinecap="round">
            <ellipse
              className="feature-draw feature-stage-1"
              pathLength="1"
              cx="159"
              cy="319"
              rx="64"
              ry="30"
            />
            <path
              className="feature-draw feature-stage-1"
              pathLength="1"
              d="M380 67C582 61 607 244 544 316"
              markerEnd={`url(#${arrow})`}
            />
            <path
              className="feature-draw feature-stage-2"
              pathLength="1"
              d="M228 565C164 568 111 549 130 510"
              markerEnd={`url(#${arrow})`}
            />
            <path
              className="feature-draw feature-stage-3"
              pathLength="1"
              d="M455 605C574 576 594 490 522 448"
              markerEnd={`url(#${arrow})`}
            />
          </g>
          <g fontSize="26" className="fill-ink">
            <text x="42" y="66" className="feature-appear feature-stage-1">
              01 · {content.callouts[0]}
            </text>
            <text x="42" y="585" className="feature-appear feature-stage-2">
              02 · {content.callouts[1]}
            </text>
            <text x="294" y="636" className="feature-appear feature-stage-3">
              03 · {content.callouts[2]}
            </text>
          </g>
        </>
      )}
    </svg>
  )
}
