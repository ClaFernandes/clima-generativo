import './WeatherScene.css'

const SKY_GRADIENTS = {
  dawn: ['#2D2A4A', '#FF8C69', '#FFD166'],
  day: ['#4A90D9', '#6EC6FF', '#BEE6FF'],
  dusk: ['#131329', '#5C3A5E', '#FF8C69'],
  night: ['#0B0B1A', '#131329', '#2D2A4A'],
}

const CELESTIAL_Y_POSITION = {
  dawn: 380,
  day: 90,
  dusk: 380,
  night: 100,
}

function getCloudPositions(count) {
  const positions = []
  for (let i = 0; i < count; i++) {
    positions.push({
      x: (i / Math.max(count - 1, 1)) * 700 + Math.sin(i) * 30,
      y: 60 + (i % 3) * 40,
      scale: 0.7 + (i % 3) * 0.15,
    })
  }
  return positions
}

export function WeatherScene({ scene }) {
  const { phase, condition, cloudCount, cloudDriftDuration } = scene
  const [colorStart, colorMid, colorEnd] = SKY_GRADIENTS[phase]
  const isNight = phase === 'night'
  const showClouds = ['clouds', 'rain', 'thunderstorm', 'fog'].includes(condition) || cloudCount > 0
  const showRain = condition === 'rain' || condition === 'thunderstorm'
  const showSnow = condition === 'snow'
  const showThunder = condition === 'thunderstorm'
  const showFog = condition === 'fog'

  const cloudPositions = getCloudPositions(Math.max(cloudCount, condition === 'clear' ? 0 : 2))

  return (
    <svg
      className="weather-scene"
      viewBox="0 0 800 500"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`Ilustração do clima: ${scene.description}`}
    >
      <defs>
        {/* Gradiente de fundo do céu, muda de acordo com a fase do dia */}
        <linearGradient id="sky-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={colorStart} />
          <stop offset="55%" stopColor={colorMid} />
          <stop offset="100%" stopColor={colorEnd} />
        </linearGradient>

        {/* Brilho ao redor do sol/lua */}
        <radialGradient id="glow-gradient">
          <stop offset="0%" stopColor={isNight ? '#F5F3EE' : '#FFD166'} stopOpacity="0.9" />
          <stop offset="100%" stopColor={isNight ? '#F5F3EE' : '#FFD166'} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Céu de fundo */}
      <rect x="0" y="0" width="800" height="500" fill="url(#sky-gradient)" />

      {/* Estrelas */}
      {isNight && (
        <g className="weather-scene__stars">
          {Array.from({ length: 40 }).map((_, i) => (
            <circle
              key={i}
              cx={(i * 137) % 800}
              cy={(i * 89) % 260}
              r={i % 5 === 0 ? 1.8 : 1}
              fill="#F5F3EE"
              opacity={0.3 + (i % 4) * 0.15}
            />
          ))}
        </g>
      )}

      {/* Sol ou lua, dependendo da fase */}
      <circle
        cx="650"
        cy={CELESTIAL_Y_POSITION[phase]}
        r="140"
        fill="url(#glow-gradient)"
      />
      <circle
        cx="650"
        cy={CELESTIAL_Y_POSITION[phase]}
        r={isNight ? 38 : 48}
        fill={isNight ? '#F5F3EE' : '#FFD166'}
      />

      {/* Nuvens */}
      {showClouds &&
        cloudPositions.map((cloud, i) => (
          <g
            key={i}
            className="weather-scene__cloud"
            style={{ '--drift-duration': `${cloudDriftDuration}s`, '--drift-delay': `${i * -3}s` }}
            transform={`translate(${cloud.x}, ${cloud.y}) scale(${cloud.scale})`}
          >
            <ellipse cx="0" cy="0" rx="55" ry="26" fill="#F5F3EE" opacity="0.9" />
            <ellipse cx="35" cy="-10" rx="40" ry="22" fill="#F5F3EE" opacity="0.9" />
            <ellipse cx="-35" cy="8" rx="38" ry="20" fill="#F5F3EE" opacity="0.85" />
          </g>
        ))}

      {/* Névoa */}
      {showFog && (
        <g className="weather-scene__fog">
          <rect x="0" y="300" width="800" height="40" fill="#F5F3EE" opacity="0.25" />
          <rect x="0" y="360" width="800" height="35" fill="#F5F3EE" opacity="0.2" />
          <rect x="0" y="420" width="800" height="45" fill="#F5F3EE" opacity="0.3" />
        </g>
      )}

      {/* Chuva */}
      {showRain && (
        <g className="weather-scene__rain">
          {Array.from({ length: 30 }).map((_, i) => (
            <line
              key={i}
              x1={(i * 27) % 800}
              y1="0"
              x2={(i * 27) % 800}
              y2="18"
              stroke="#BEE6FF"
              strokeWidth="2.5"
              strokeLinecap="round"
              style={{ '--fall-delay': `${(i % 10) * 0.15}s` }}
            />
          ))}
        </g>
      )}

      {/* Neve */}
      {showSnow && (
        <g className="weather-scene__snow">
          {Array.from({ length: 25 }).map((_, i) => (
            <circle
              key={i}
              cx={(i * 33) % 800}
              cy="0"
              r={2 + (i % 3)}
              fill="#F5F3EE"
              style={{ '--fall-delay': `${(i % 8) * 0.4}s` }}
            />
          ))}
        </g>
      )}

      {/* Relâmpago  */}
      {showThunder && <rect className="weather-scene__thunder" x="0" y="0" width="800" height="500" fill="#F5F3EE" />}

      {/* Rosa dos ventos */}
      <g className="weather-scene__compass" transform="translate(742, 62)">
        <circle r="34" fill="rgba(20, 22, 28, 0.45)" stroke="#C9A24B" strokeWidth="1.5" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
          <line
            key={deg}
            x1="0"
            y1="-34"
            x2="0"
            y2={deg % 90 === 0 ? '-27' : '-30'}
            stroke="#C9A24B"
            strokeWidth={deg % 90 === 0 ? '1.5' : '1'}
            transform={`rotate(${deg})`}
          />
        ))}
        <text x="0" y="-22" fontSize="9" fill="#C9A24B" textAnchor="middle" fontFamily="'Space Mono', monospace">
          N
        </text>
        {/* Agulha */}
        <g transform={`rotate(${scene.windDeg})`}>
          <line x1="0" y1="4" x2="0" y2="-24" stroke="#C9A24B" strokeWidth="2" strokeLinecap="round" />
          <path d="M 0 -24 L -4 -16 L 4 -16 Z" fill="#C9A24B" />
        </g>
        <circle r="2.5" fill="#C9A24B" />
      </g>
    </svg>
  )
}
