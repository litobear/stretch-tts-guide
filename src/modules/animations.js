// SVG Animations Templates for ZenStretch Exercises

// Helper to wrap SVG with standard responsive viewport attributes
function wrapSVG(content) {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="100%" height="100%" class="stretch-svg">
      <!-- Background mesh / circles for depth -->
      <circle cx="100" cy="100" r="85" fill="var(--accent-soft)" opacity="0.4" />
      <circle cx="100" cy="100" r="70" fill="none" stroke="var(--border-color)" stroke-width="1" stroke-dasharray="3 3" />
      ${content}
    </svg>
  `;
}

// 1. Neck Tilt SVG
const neckTiltSVG = wrapSVG(`
  <!-- Torso Base -->
  <path d="M60 180 C60 150, 140 150, 140 180" fill="none" stroke="var(--text-secondary)" stroke-width="4" stroke-linecap="round" />
  
  <!-- Neck Pivot Base -->
  <line x1="100" y1="150" x2="100" y2="110" stroke="var(--text-secondary)" stroke-width="5" stroke-linecap="round" />
  
  <!-- Animated Head & Face Group -->
  <g class="animate-neck-head">
    <!-- Neck Upper -->
    <line x1="100" y1="110" x2="100" y2="90" stroke="var(--text-secondary)" stroke-width="5" stroke-linecap="round" />
    
    <!-- Head Outline -->
    <circle cx="100" cy="75" r="22" fill="var(--bg-secondary)" stroke="var(--accent-primary)" stroke-width="3" />
    
    <!-- Relaxed Closed Eyes -->
    <path d="M92 75 Q95 78, 98 75" fill="none" stroke="var(--text-secondary)" stroke-width="2" stroke-linecap="round" />
    <path d="M102 75 Q105 78, 108 75" fill="none" stroke="var(--text-secondary)" stroke-width="2" stroke-linecap="round" />
    
    <!-- Soft smile -->
    <path d="M97 85 Q100 88, 103 85" fill="none" stroke="var(--text-secondary)" stroke-width="1.5" stroke-linecap="round" />
  </g>
  
  <!-- Directional arrow curves to guide movement -->
  <g class="animate-arrow-guide">
    <path d="M70 65 Q100 45, 130 65" fill="none" stroke="var(--accent-peach)" stroke-width="2" stroke-dasharray="4 2" stroke-linecap="round" />
    <polygon points="70 65 76 61 74 69" fill="var(--accent-peach)" />
    <polygon points="130 65 124 61 126 69" fill="var(--accent-peach)" />
  </g>
`);

// 2. Shoulder Roll SVG
const shoulderRollSVG = wrapSVG(`
  <!-- Body/Torso Outline -->
  <path d="M50 180 C55 140, 145 140, 150 180" fill="none" stroke="var(--text-secondary)" stroke-width="3" stroke-linecap="round" />
  
  <!-- Neck and Head -->
  <line x1="100" y1="140" x2="100" y2="105" stroke="var(--text-secondary)" stroke-width="4" stroke-linecap="round" />
  <circle cx="100" cy="85" r="18" fill="var(--bg-secondary)" stroke="var(--text-secondary)" stroke-width="3" />
  <!-- Eyes -->
  <path d="M94 85 Q97 88, 100 85" fill="none" stroke="var(--text-secondary)" stroke-width="1.5" />
  <path d="M100 85 Q103 88, 106 85" fill="none" stroke="var(--text-secondary)" stroke-width="1.5" />

  <!-- Animated Shoulders Joints -->
  <!-- Left Shoulder Joint -->
  <g class="animate-shoulder-l">
    <circle cx="65" cy="140" r="8" fill="var(--accent-primary)" opacity="0.8" />
    <path d="M65 140 A 5 5 0 1 1 65 139" fill="none" stroke="var(--text-inverse)" stroke-width="1.5" />
  </g>
  
  <!-- Right Shoulder Joint -->
  <g class="animate-shoulder-r">
    <circle cx="135" cy="140" r="8" fill="var(--accent-primary)" opacity="0.8" />
    <path d="M135 140 A 5 5 0 1 0 135 139" fill="none" stroke="var(--text-inverse)" stroke-width="1.5" />
  </g>

  <!-- Orbital arrow paths showing circular motion -->
  <path d="M55 125 A 15 15 0 1 1 75 125" fill="none" stroke="var(--accent-peach)" stroke-width="1.5" stroke-dasharray="3 3" />
  <path d="M125 125 A 15 15 0 1 1 145 125" fill="none" stroke="var(--accent-peach)" stroke-width="1.5" stroke-dasharray="3 3" />
`);

// 3. Chest Opener SVG
const chestOpenerSVG = wrapSVG(`
  <!-- Spine/Torso -->
  <line x1="100" y1="180" x2="100" y2="95" stroke="var(--text-secondary)" stroke-width="4" stroke-linecap="round" />
  <circle cx="100" cy="70" r="16" fill="var(--bg-secondary)" stroke="var(--text-secondary)" stroke-width="3" />

  <!-- Animated Arms opening chest -->
  <!-- Left Arm -->
  <g class="animate-chest-arm-l">
    <line x1="100" y1="95" x2="60" y2="105" stroke="var(--accent-primary)" stroke-width="4" stroke-linecap="round" />
    <line x1="60" y1="105" x2="35" y2="135" stroke="var(--accent-primary)" stroke-width="3" stroke-linecap="round" />
    <circle cx="35" cy="135" r="4" fill="var(--accent-primary)" />
  </g>

  <!-- Right Arm -->
  <g class="animate-chest-arm-r">
    <line x1="100" y1="95" x2="140" y2="105" stroke="var(--accent-primary)" stroke-width="4" stroke-linecap="round" />
    <line x1="140" y1="105" x2="165" y2="135" stroke="var(--accent-primary)" stroke-width="3" stroke-linecap="round" />
    <circle cx="165" cy="135" r="4" fill="var(--accent-primary)" />
  </g>

  <!-- Breathing Expansion Arrows -->
  <g class="animate-arrow-guide">
    <!-- Left expansion arrow -->
    <path d="M80 115 L60 115" fill="none" stroke="var(--accent-peach)" stroke-width="2" stroke-linecap="round" />
    <polygon points="60 115 66 111 66 119" fill="var(--accent-peach)" />
    
    <!-- Right expansion arrow -->
    <path d="M120 115 L140 115" fill="none" stroke="var(--accent-peach)" stroke-width="2" stroke-linecap="round" />
    <polygon points="140 115 134 111 134 119" fill="var(--accent-peach)" />
  </g>
`);

// 4. Torso Side Stretch SVG
const sideStretchSVG = wrapSVG(`
  <!-- Hips/Lower Legs base -->
  <line x1="85" y1="180" x2="115" y2="180" stroke="var(--text-secondary)" stroke-width="4" stroke-linecap="round" />
  <line x1="100" y1="180" x2="100" y2="145" stroke="var(--text-secondary)" stroke-width="4" />
  
  <!-- Animated Torso bending sideways -->
  <g class="animate-torso-side">
    <!-- Spine -->
    <line x1="100" y1="145" x2="100" y2="90" stroke="var(--accent-primary)" stroke-width="4" stroke-linecap="round" />
    
    <!-- Head -->
    <circle cx="100" cy="68" r="14" fill="var(--bg-secondary)" stroke="var(--accent-primary)" stroke-width="3" />
    
    <!-- Arm (reaching over head) -->
    <path d="M100 90 Q120 60, 95 35" fill="none" stroke="var(--accent-peach)" stroke-width="3.5" stroke-linecap="round" />
    
    <!-- Arm (hanging on hip) -->
    <path d="M100 90 Q85 105, 85 125" fill="none" stroke="var(--text-secondary)" stroke-width="3" stroke-linecap="round" />
  </g>

  <!-- Side Stretch Arrow curve -->
  <g class="animate-arrow-guide">
    <path d="M125 90 Q135 60, 115 45" fill="none" stroke="var(--accent-primary)" stroke-width="1.5" stroke-dasharray="3 3" />
    <polygon points="115 45 122 43 118 51" fill="var(--accent-primary)" />
  </g>
`);

// 5. Forward Fold SVG
const forwardFoldSVG = wrapSVG(`
  <!-- Legs Base (Standing side profile) -->
  <!-- Ground -->
  <line x1="40" y1="185" x2="160" y2="185" stroke="var(--border-color)" stroke-width="1" />
  <!-- Legs -->
  <line x1="100" y1="185" x2="100" y2="145" stroke="var(--text-secondary)" stroke-width="4" stroke-linecap="round" />
  <line x1="105" y1="185" x2="105" y2="145" stroke="var(--text-secondary)" stroke-width="4" stroke-linecap="round" />
  <!-- Hips pivot point -->
  <circle cx="102" cy="145" r="5" fill="var(--text-primary)" />

  <!-- Animated Upper Body Group bending at the waist -->
  <g class="animate-upper-body-fold">
    <!-- Back/Torso -->
    <line x1="102" y1="145" x2="102" y2="90" stroke="var(--accent-primary)" stroke-width="4" stroke-linecap="round" />
    
    <!-- Neck & Head -->
    <line x1="102" y1="90" x2="102" y2="75" stroke="var(--accent-primary)" stroke-width="4" stroke-linecap="round" />
    <circle cx="102" cy="60" r="14" fill="var(--bg-secondary)" stroke="var(--accent-primary)" stroke-width="3" />
    
    <!-- Hanging Arms -->
    <path d="M102 90 Q85 110, 80 135" fill="none" stroke="var(--text-secondary)" stroke-width="3" stroke-linecap="round" />
  </g>
  
  <!-- Stretch Arrow bending downward -->
  <g class="animate-arrow-guide">
    <path d="M125 90 C145 100, 135 150, 115 155" fill="none" stroke="var(--accent-peach)" stroke-width="1.5" stroke-dasharray="3 3" />
    <polygon points="115 155 120 149 113 151" fill="var(--accent-peach)" />
  </g>
`);

// Default visual (resting/preparing)
const defaultVisualSVG = wrapSVG(`
  <!-- Center meditating/resting circle -->
  <circle cx="100" cy="100" r="24" fill="var(--accent-primary)" opacity="0.15" class="pulse-active" />
  <circle cx="100" cy="100" r="14" fill="var(--accent-primary)" opacity="0.6" />
  <path d="M100 80 L100 120 M80 100 L120 100" stroke="var(--text-inverse)" stroke-width="2" stroke-linecap="round" opacity="0.7"/>
`);

// Export animation maps
export function getAnimationSVG(type) {
  switch (type) {
    case 'neck-tilt':
      return neckTiltSVG;
    case 'shoulder-roll':
      return shoulderRollSVG;
    case 'chest-opener':
      return chestOpenerSVG;
    case 'side-stretch':
      return sideStretchSVG;
    case 'forward-fold':
      return forwardFoldSVG;
    default:
      return defaultVisualSVG;
  }
}
