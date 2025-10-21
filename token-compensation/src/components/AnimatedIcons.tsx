export const AnimatedCalculator = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="animated-icon"
  >
    <style>{`
      .animated-icon {
        animation: float 3s ease-in-out infinite;
      }
      @keyframes float {
        0%, 100% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
      }
      .calc-display {
        animation: pulse 2s ease-in-out infinite;
      }
      @keyframes pulse {
        0%, 100% { opacity: 0.6; }
        50% { opacity: 1; }
      }
      .calc-button {
        animation: buttonPulse 1.5s ease-in-out infinite;
      }
      @keyframes buttonPulse {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
      }
    `}</style>
    <rect x="6" y="6" width="36" height="36" rx="4" stroke="#10b981" strokeWidth="2" fill="none" />
    <rect className="calc-display" x="10" y="10" width="28" height="8" rx="2" fill="#10b981" opacity="0.6" />
    <circle className="calc-button" cx="14" cy="26" r="2" fill="#10b981" style={{ animationDelay: '0s' }} />
    <circle className="calc-button" cx="24" cy="26" r="2" fill="#10b981" style={{ animationDelay: '0.2s' }} />
    <circle className="calc-button" cx="34" cy="26" r="2" fill="#10b981" style={{ animationDelay: '0.4s' }} />
    <circle className="calc-button" cx="14" cy="34" r="2" fill="#10b981" style={{ animationDelay: '0.6s' }} />
    <circle className="calc-button" cx="24" cy="34" r="2" fill="#10b981" style={{ animationDelay: '0.8s' }} />
    <circle className="calc-button" cx="34" cy="34" r="2" fill="#10b981" style={{ animationDelay: '1s' }} />
  </svg>
);

export const AnimatedShield = () => (
  <svg
    width="56"
    height="56"
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <style>{`
      .shield-outline {
        animation: shieldPulse 2s ease-in-out infinite;
      }
      @keyframes shieldPulse {
        0%, 100% { stroke-width: 2; opacity: 0.6; }
        50% { stroke-width: 3; opacity: 1; }
      }
      .shield-inner {
        animation: shimmer 3s ease-in-out infinite;
      }
      @keyframes shimmer {
        0%, 100% { opacity: 0.3; }
        50% { opacity: 0.7; }
      }
      .alert-icon {
        animation: alertBlink 1.5s ease-in-out infinite;
      }
      @keyframes alertBlink {
        0%, 100% { opacity: 0.5; }
        50% { opacity: 1; }
      }
    `}</style>
    <path
      className="shield-outline"
      d="M28 8L12 14V26C12 36 20 43 28 48C36 43 44 36 44 26V14L28 8Z"
      stroke="#ef4444"
      fill="none"
    />
    <path
      className="shield-inner"
      d="M28 12L16 16.5V26C16 34 22 40 28 44C34 40 40 34 40 26V16.5L28 12Z"
      fill="#ef4444"
      opacity="0.3"
    />
    <circle className="alert-icon" cx="28" cy="24" r="2" fill="#ef4444" />
    <rect className="alert-icon" x="27" y="28" width="2" height="6" rx="1" fill="#ef4444" />
  </svg>
);

export const AnimatedDocument = () => (
  <svg
    width="56"
    height="56"
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <style>{`
      .doc-page {
        animation: pageFlip 3s ease-in-out infinite;
      }
      @keyframes pageFlip {
        0%, 100% { transform: rotateY(0deg); }
        50% { transform: rotateY(10deg); }
      }
      .doc-line {
        animation: lineWrite 2s ease-in-out infinite;
      }
      @keyframes lineWrite {
        0% { stroke-dashoffset: 20; }
        100% { stroke-dashoffset: 0; }
      }
    `}</style>
    <rect className="doc-page" x="14" y="8" width="28" height="40" rx="2" stroke="#f59e0b" strokeWidth="2" fill="none" />
    <line className="doc-line" x1="18" y1="16" x2="38" y2="16" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 2" style={{ animationDelay: '0s' }} />
    <line className="doc-line" x1="18" y1="22" x2="38" y2="22" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 2" style={{ animationDelay: '0.3s' }} />
    <line className="doc-line" x1="18" y1="28" x2="32" y2="28" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 2" style={{ animationDelay: '0.6s' }} />
    <circle cx="42" cy="38" r="8" fill="#f59e0b" opacity="0.2" />
    <path d="M39 38L41 40L45 36" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const AnimatedTrend = () => (
  <svg
    width="56"
    height="56"
    viewBox="0 0 56 56"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <style>{`
      .trend-line {
        animation: drawLine 3s ease-in-out infinite;
        stroke-dasharray: 60;
        stroke-dashoffset: 60;
      }
      @keyframes drawLine {
        0% { stroke-dashoffset: 60; }
        100% { stroke-dashoffset: 0; }
      }
      .trend-dot {
        animation: dotPulse 1.5s ease-in-out infinite;
      }
      @keyframes dotPulse {
        0%, 100% { r: 3; opacity: 0.6; }
        50% { r: 4; opacity: 1; }
      }
    `}</style>
    <path className="trend-line" d="M10 40L20 32L30 36L40 20L48 24" stroke="#fb923c" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <circle className="trend-dot" cx="10" cy="40" fill="#fb923c" style={{ animationDelay: '0s' }} />
    <circle className="trend-dot" cx="20" cy="32" fill="#fb923c" style={{ animationDelay: '0.2s' }} />
    <circle className="trend-dot" cx="30" cy="36" fill="#fb923c" style={{ animationDelay: '0.4s' }} />
    <circle className="trend-dot" cx="40" cy="20" fill="#fb923c" style={{ animationDelay: '0.6s' }} />
    <circle className="trend-dot" cx="48" cy="24" fill="#fb923c" style={{ animationDelay: '0.8s' }} />
    <path d="M42 20L40 20L40 22" stroke="#fb923c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const AnimatedCheckCircle = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <style>{`
      .check-circle {
        animation: circleGrow 2s ease-in-out infinite;
      }
      @keyframes circleGrow {
        0%, 100% { transform: scale(1); opacity: 0.6; }
        50% { transform: scale(1.05); opacity: 1; }
      }
      .check-mark {
        animation: checkDraw 1.5s ease-in-out infinite;
        stroke-dasharray: 30;
        stroke-dashoffset: 30;
      }
      @keyframes checkDraw {
        0% { stroke-dashoffset: 30; }
        100% { stroke-dashoffset: 0; }
      }
    `}</style>
    <circle className="check-circle" cx="24" cy="24" r="18" stroke="#10b981" strokeWidth="2" fill="none" />
    <path className="check-mark" d="M14 24L20 30L34 16" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const AnimatedUsers = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <style>{`
      .user-icon {
        animation: userBounce 2s ease-in-out infinite;
      }
      @keyframes userBounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-4px); }
      }
    `}</style>
    <circle className="user-icon" cx="18" cy="16" r="6" stroke="#10b981" strokeWidth="2" fill="none" style={{ animationDelay: '0s' }} />
    <path className="user-icon" d="M8 36C8 31 12 28 18 28C24 28 28 31 28 36" stroke="#10b981" strokeWidth="2" strokeLinecap="round" style={{ animationDelay: '0s' }} />
    <circle className="user-icon" cx="32" cy="18" r="5" stroke="#10b981" strokeWidth="2" fill="none" style={{ animationDelay: '0.3s' }} />
    <path className="user-icon" d="M28 36C28 33 30 30 34 30C38 30 40 33 40 36" stroke="#10b981" strokeWidth="2" strokeLinecap="round" style={{ animationDelay: '0.3s' }} />
  </svg>
);

export const AnimatedAward = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <style>{`
      .award-circle {
        animation: awardRotate 4s linear infinite;
      }
      @keyframes awardRotate {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      .award-star {
        animation: starTwinkle 1.5s ease-in-out infinite;
      }
      @keyframes starTwinkle {
        0%, 100% { opacity: 0.6; }
        50% { opacity: 1; }
      }
      .award-ribbon {
        animation: ribbonWave 2s ease-in-out infinite;
      }
      @keyframes ribbonWave {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-2px); }
      }
    `}</style>
    <circle className="award-circle" cx="24" cy="20" r="12" stroke="#10b981" strokeWidth="2" fill="none" />
    <path className="award-star" d="M24 12L26 18L32 18L27 22L29 28L24 24L19 28L21 22L16 18L22 18Z" fill="#10b981" opacity="0.6" />
    <path className="award-ribbon" d="M18 28L16 40L20 36L24 38" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path className="award-ribbon" d="M30 28L32 40L28 36L24 38" stroke="#10b981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animationDelay: '0.3s' }} />
  </svg>
);

export const AnimatedLightbulb = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <style>{`
      .bulb-glow {
        animation: glow 2s ease-in-out infinite;
      }
      @keyframes glow {
        0%, 100% { opacity: 0.3; fill: #10b981; }
        50% { opacity: 0.8; fill: #34d399; }
      }
      .light-ray {
        animation: rayPulse 1.5s ease-in-out infinite;
      }
      @keyframes rayPulse {
        0%, 100% { opacity: 0.4; transform: scale(1); }
        50% { opacity: 1; transform: scale(1.2); }
      }
    `}</style>
    <circle className="bulb-glow" cx="24" cy="18" r="10" />
    <path d="M24 8L24 4M12 10L9 7M36 10L39 7M8 20L4 20M40 20L44 20" stroke="#10b981" strokeWidth="2" strokeLinecap="round" className="light-ray" />
    <path d="M18 26C18 26 18 30 18 32C18 34 20 36 24 36C28 36 30 34 30 32C30 30 30 26 30 26" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
    <line x1="18" y1="38" x2="30" y2="38" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const AnimatedChart = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <style>{`
      .bar {
        animation: barGrow 2s ease-in-out infinite;
      }
      @keyframes barGrow {
        0%, 100% { transform: scaleY(1); transform-origin: bottom; }
        50% { transform: scaleY(1.2); transform-origin: bottom; }
      }
    `}</style>
    <rect className="bar" x="8" y="24" width="6" height="16" rx="1" fill="#10b981" style={{ animationDelay: '0s' }} />
    <rect className="bar" x="18" y="16" width="6" height="24" rx="1" fill="#10b981" style={{ animationDelay: '0.2s' }} />
    <rect className="bar" x="28" y="20" width="6" height="20" rx="1" fill="#10b981" style={{ animationDelay: '0.4s' }} />
    <rect className="bar" x="38" y="12" width="6" height="28" rx="1" fill="#10b981" style={{ animationDelay: '0.6s' }} />
    <line x1="4" y1="40" x2="44" y2="40" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const AnimatedTarget = () => (
  <svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <style>{`
      .target-ring {
        animation: ringExpand 2s ease-in-out infinite;
      }
      @keyframes ringExpand {
        0%, 100% { r: 8; opacity: 0.8; }
        50% { r: 10; opacity: 0.4; }
      }
      .target-center {
        animation: centerPulse 1.5s ease-in-out infinite;
      }
      @keyframes centerPulse {
        0%, 100% { r: 3; }
        50% { r: 4; }
      }
    `}</style>
    <circle cx="24" cy="24" r="18" stroke="#10b981" strokeWidth="2" fill="none" />
    <circle cx="24" cy="24" r="12" stroke="#10b981" strokeWidth="2" fill="none" />
    <circle className="target-ring" cx="24" cy="24" stroke="#10b981" strokeWidth="2" fill="none" />
    <circle className="target-center" cx="24" cy="24" r="3" fill="#10b981" />
  </svg>
);
