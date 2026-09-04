const fs = require('fs');
const path = require('path');

const assetsDir = path.join(__dirname, '..', 'public', 'assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

// 1. Window AC Kaze Plus
const windowAcSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="100%" height="100%">
  <defs>
    <linearGradient id="wacBody" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="70%" stop-color="#f1f5f9"/>
      <stop offset="100%" stop-color="#e2e8f0"/>
    </linearGradient>
    <linearGradient id="wacGrille" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#e2e8f0"/>
      <stop offset="50%" stop-color="#cbd5e1"/>
      <stop offset="100%" stop-color="#94a3b8"/>
    </linearGradient>
    <linearGradient id="copperGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#d97706"/>
      <stop offset="50%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#b45309"/>
    </linearGradient>
    <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#0f172a" flood-opacity="0.15"/>
    </filter>
  </defs>
  <!-- Background Studio Box -->
  <rect width="600" height="450" rx="16" fill="#f8fafc"/>
  <circle cx="300" cy="225" r="180" fill="#e2e8f0" opacity="0.4"/>

  <!-- Outer Casing Shadow & Unit Body -->
  <g filter="url(#shadow)">
    <rect x="70" y="80" width="460" height="290" rx="12" fill="url(#wacBody)" stroke="#cbd5e1" stroke-width="2"/>
    <rect x="70" y="80" width="460" height="10" rx="4" fill="#e2e8f0"/>
    <!-- Outer Side Chasis Line -->
    <line x1="70" y1="360" x2="530" y2="360" stroke="#cbd5e1" stroke-width="1.5"/>
  </g>

  <!-- Left Side: Cooling Coil Louvers Section -->
  <rect x="95" y="110" width="265" height="235" rx="8" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
  <!-- Louvers -->
  <g stroke="#94a3b8" stroke-width="2.5" stroke-linecap="round">
    <line x1="108" y1="130" x2="348" y2="130"/>
    <line x1="108" y1="148" x2="348" y2="148"/>
    <line x1="108" y1="166" x2="348" y2="166"/>
    <line x1="108" y1="184" x2="348" y2="184"/>
    <line x1="108" y1="202" x2="348" y2="202"/>
    <line x1="108" y1="220" x2="348" y2="220"/>
    <line x1="108" y1="238" x2="348" y2="238"/>
    <line x1="108" y1="256" x2="348" y2="256"/>
    <line x1="108" y1="274" x2="348" y2="274"/>
    <line x1="108" y1="292" x2="348" y2="292"/>
    <line x1="108" y1="310" x2="348" y2="310"/>
    <line x1="108" y1="328" x2="348" y2="328"/>
  </g>

  <!-- Right Side: Control & Display Panel -->
  <rect x="375" y="110" width="135" height="235" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5"/>

  <!-- Brand Hitachi Text -->
  <text x="442" y="138" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="15" fill="#e60012" text-anchor="middle" letter-spacing="1.5">HITACHI</text>
  <text x="442" y="152" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="9" fill="#64748b" text-anchor="middle">KAZE PLUS</text>

  <!-- Digital Temperature LED Display Panel -->
  <rect x="390" y="165" width="105" height="58" rx="6" fill="#0f172a"/>
  <text x="430" y="206" font-family="'Courier New', monospace" font-weight="bold" font-size="34" fill="#38bdf8" text-anchor="middle">21</text>
  <text x="468" y="188" font-family="'Courier New', monospace" font-weight="bold" font-size="16" fill="#38bdf8">°C</text>
  <circle cx="405" cy="180" r="3" fill="#22c55e"/>
  <text x="412" y="183" font-family="sans-serif" font-size="7" fill="#94a3b8">COOL</text>
  <circle cx="405" cy="202" r="3" fill="#38bdf8"/>
  <text x="412" y="205" font-family="sans-serif" font-size="7" fill="#94a3b8">AUTO</text>

  <!-- Control Buttons -->
  <g fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1">
    <rect x="390" y="235" width="48" height="26" rx="4"/>
    <rect x="447" y="235" width="48" height="26" rx="4"/>
    <rect x="390" y="268" width="48" height="26" rx="4"/>
    <rect x="447" y="268" width="48" height="26" rx="4"/>
  </g>
  <!-- Button Labels -->
  <text x="414" y="252" font-family="sans-serif" font-size="8.5" font-weight="bold" fill="#334155" text-anchor="middle">TEMP ▲</text>
  <text x="471" y="252" font-family="sans-serif" font-size="8.5" font-weight="bold" fill="#334155" text-anchor="middle">TEMP ▼</text>
  <text x="414" y="285" font-family="sans-serif" font-size="8.5" font-weight="bold" fill="#334155" text-anchor="middle">MODE</text>
  <text x="471" y="285" font-family="sans-serif" font-size="8.5" font-weight="bold" fill="#e60012" text-anchor="middle">POWER</text>

  <!-- Copper Badge -->
  <rect x="390" y="306" width="105" height="24" rx="4" fill="url(#copperGrad)"/>
  <text x="442" y="322" font-family="sans-serif" font-size="9" font-weight="bold" fill="#ffffff" text-anchor="middle">100% COPPER</text>

  <!-- Star Rating Badge Overlay -->
  <g transform="translate(85, 95)">
    <rect width="64" height="22" rx="4" fill="#e60012"/>
    <text x="32" y="15" font-family="sans-serif" font-size="10" font-weight="bold" fill="#ffffff" text-anchor="middle">★ 3-STAR</text>
  </g>
</svg>`;

// 2. Commercial Cassette AC
const cassetteAcSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="100%" height="100%">
  <defs>
    <linearGradient id="cassetteBody" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#e2e8f0"/>
    </linearGradient>
    <filter id="cassetteShadow">
      <feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#0f172a" flood-opacity="0.18"/>
    </filter>
  </defs>
  <rect width="600" height="450" rx="16" fill="#f8fafc"/>
  <circle cx="300" cy="225" r="190" fill="#e0f2fe" opacity="0.3"/>

  <!-- Ceiling Context Lines -->
  <line x1="40" y1="90" x2="560" y2="90" stroke="#e2e8f0" stroke-width="1.5" stroke-dasharray="8 8"/>
  <line x1="40" y1="360" x2="560" y2="360" stroke="#e2e8f0" stroke-width="1.5" stroke-dasharray="8 8"/>

  <!-- Cassette Main Outer Bezel Panel -->
  <g filter="url(#cassetteShadow)">
    <rect x="110" y="80" width="380" height="290" rx="28" fill="url(#cassetteBody)" stroke="#cbd5e1" stroke-width="2"/>
  </g>

  <!-- Central Air Intake Grille -->
  <rect x="190" y="145" width="220" height="160" rx="16" fill="#f8fafc" stroke="#94a3b8" stroke-width="1.5"/>
  <!-- Mesh Holes pattern -->
  <g fill="#cbd5e1">
    ${Array.from({ length: 7 }, (_, r) => 
      Array.from({ length: 11 }, (_, c) => 
        `<circle cx="${212 + c * 18}" cy="${165 + r * 19}" r="3"/>`
      ).join('')
    ).join('')}
  </g>

  <!-- 4-Way Discharge Louvers (Top, Bottom, Left, Right) -->
  <!-- Top Louver -->
  <rect x="190" y="98" width="220" height="30" rx="6" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1"/>
  <line x1="205" y1="113" x2="395" y2="113" stroke="#64748b" stroke-width="3" stroke-linecap="round"/>
  <!-- Bottom Louver -->
  <rect x="190" y="322" width="220" height="30" rx="6" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1"/>
  <line x1="205" y1="337" x2="395" y2="337" stroke="#64748b" stroke-width="3" stroke-linecap="round"/>
  <!-- Left Louver -->
  <rect x="128" y="145" width="45" height="160" rx="6" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1"/>
  <line x1="150" y1="160" x2="150" y2="290" stroke="#64748b" stroke-width="3" stroke-linecap="round"/>
  <!-- Right Louver -->
  <rect x="427" y="145" width="45" height="160" rx="6" fill="#f1f5f9" stroke="#94a3b8" stroke-width="1"/>
  <line x1="450" y1="160" x2="450" y2="290" stroke="#64748b" stroke-width="3" stroke-linecap="round"/>

  <!-- Brand Center Plate -->
  <rect x="250" y="205" width="100" height="40" rx="6" fill="#ffffff" stroke="#e2e8f0" stroke-width="1"/>
  <text x="300" y="226" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="13" fill="#e60012" text-anchor="middle" letter-spacing="1">HITACHI</text>
  <text x="300" y="238" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="7.5" fill="#64748b" text-anchor="middle">360° ROUND FLOW</text>

  <!-- Status Sensor Pod -->
  <circle cx="462" cy="112" r="10" fill="#0f172a"/>
  <circle cx="462" cy="112" r="4" fill="#38bdf8"/>

  <!-- Airflow Indicator Arrows -->
  <g stroke="#38bdf8" stroke-width="2" fill="none" opacity="0.7">
    <path d="M 300 80 L 300 65 M 295 72 L 300 65 L 305 72"/>
    <path d="M 300 370 L 300 385 M 295 378 L 300 385 L 305 378"/>
    <path d="M 95 225 L 80 225 M 88 220 L 80 225 L 88 230"/>
    <path d="M 505 225 L 520 225 M 512 220 L 520 225 L 512 230"/>
  </g>
</svg>`;

// 3. VRF Set-Free Commercial Outdoor System
const vrfOutdoorSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="100%" height="100%">
  <defs>
    <linearGradient id="vrfCabinet" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#334155"/>
      <stop offset="30%" stop-color="#475569"/>
      <stop offset="100%" stop-color="#1e293b"/>
    </linearGradient>
    <linearGradient id="grilleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#1e293b"/>
    </linearGradient>
  </defs>
  <rect width="600" height="450" rx="16" fill="#f8fafc"/>
  <rect x="50" y="370" width="500" height="20" rx="4" fill="#cbd5e1" opacity="0.6"/>

  <!-- VRF Unit 1 (Large Master) -->
  <g transform="translate(100, 70)">
    <!-- Base feet -->
    <rect x="20" y="300" width="40" height="15" rx="3" fill="#0f172a"/>
    <rect x="180" y="300" width="40" height="15" rx="3" fill="#0f172a"/>
    <!-- Main Chassis -->
    <rect x="10" y="10" width="220" height="295" rx="8" fill="url(#vrfCabinet)" stroke="#64748b" stroke-width="1.5"/>
    <!-- Top Fan Discharge Cowl -->
    <rect x="30" y="25" width="180" height="85" rx="42" fill="url(#grilleGrad)" stroke="#64748b" stroke-width="2"/>
    <circle cx="120" cy="67" r="32" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5"/>
    <!-- Fan Blade lines -->
    <line x1="120" y1="35" x2="120" y2="99" stroke="#94a3b8" stroke-width="2"/>
    <line x1="88" y1="67" x2="152" y2="67" stroke="#94a3b8" stroke-width="2"/>

    <!-- Middle Divider & Hitachi Logo Plate -->
    <rect x="25" y="125" width="190" height="30" rx="4" fill="#0f172a" stroke="#475569" stroke-width="1"/>
    <text x="120" y="145" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="13" fill="#e60012" text-anchor="middle" letter-spacing="1">HITACHI</text>

    <!-- Lower Heat Exchanger Coil Louvers -->
    <rect x="25" y="165" width="190" height="125" rx="4" fill="#1e293b"/>
    <g stroke="#64748b" stroke-width="1.5">
      ${Array.from({ length: 9 }, (_, i) => `<line x1="35" y1="${178 + i * 12}" x2="205" y2="${178 + i * 12}"/>`).join('')}
    </g>

    <!-- VRF Badge -->
    <rect x="35" y="260" width="70" height="18" rx="3" fill="#e60012"/>
    <text x="70" y="273" font-family="sans-serif" font-size="9" font-weight="bold" fill="#ffffff" text-anchor="middle">SET-FREE</text>
  </g>

  <!-- VRF Unit 2 (Slave Modular Unit Connected) -->
  <g transform="translate(320, 100)">
    <!-- Base feet -->
    <rect x="20" y="270" width="35" height="15" rx="3" fill="#0f172a"/>
    <rect x="145" y="270" width="35" height="15" rx="3" fill="#0f172a"/>
    <!-- Main Chassis -->
    <rect x="10" y="10" width="180" height="265" rx="8" fill="url(#vrfCabinet)" stroke="#64748b" stroke-width="1.5"/>
    <!-- Top Fan Cowl -->
    <circle cx="100" cy="65" r="40" fill="url(#grilleGrad)" stroke="#64748b" stroke-width="2"/>
    <circle cx="100" cy="65" r="22" fill="#0f172a" stroke="#38bdf8" stroke-width="1.5"/>

    <!-- Heat Exchanger Louvers -->
    <rect x="25" y="130" width="150" height="130" rx="4" fill="#1e293b"/>
    <g stroke="#64748b" stroke-width="1.5">
      ${Array.from({ length: 9 }, (_, i) => `<line x1="35" y1="${142 + i * 12}" x2="165" y2="${142 + i * 12}"/>`).join('')}
    </g>
  </g>

  <!-- Connecting Refrigerant Piping between units -->
  <path d="M 310 240 L 330 240 M 310 260 L 330 260" stroke="#d97706" stroke-width="5" stroke-linecap="round"/>
</svg>`;

// 4. Tower AC (Floor Standing)
const towerAcSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="100%" height="100%">
  <defs>
    <linearGradient id="towerBody" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="50%" stop-color="#f8fafc"/>
      <stop offset="100%" stop-color="#e2e8f0"/>
    </linearGradient>
    <filter id="towerShadow">
      <feDropShadow dx="0" dy="10" stdDeviation="10" flood-color="#0f172a" flood-opacity="0.15"/>
    </filter>
  </defs>
  <rect width="600" height="450" rx="16" fill="#f8fafc"/>
  <circle cx="300" cy="225" r="170" fill="#f1f5f9"/>

  <g filter="url(#towerShadow)">
    <!-- Tower Body -->
    <rect x="235" y="50" width="130" height="340" rx="14" fill="url(#towerBody)" stroke="#cbd5e1" stroke-width="1.5"/>
    <rect x="225" y="380" width="150" height="14" rx="4" fill="#334155"/>
  </g>

  <!-- Top Curved Head & Brand -->
  <text x="300" y="82" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="14" fill="#e60012" text-anchor="middle" letter-spacing="1">HITACHI</text>
  <text x="300" y="96" font-family="'Plus Jakarta Sans', sans-serif" font-weight="bold" font-size="7.5" fill="#64748b" text-anchor="middle">COMMERCIAL TOWER</text>

  <!-- Upper Blow Air Louvers -->
  <rect x="250" y="110" width="100" height="110" rx="6" fill="#0f172a"/>
  <!-- Louver Blades with glowing cyan accent -->
  <g stroke="#38bdf8" stroke-width="2" opacity="0.9">
    <line x1="258" y1="125" x2="342" y2="125"/>
    <line x1="258" y1="140" x2="342" y2="140"/>
    <line x1="258" y1="155" x2="342" y2="155"/>
    <line x1="258" y1="170" x2="342" y2="170"/>
    <line x1="258" y1="185" x2="342" y2="185"/>
    <line x1="258" y1="200" x2="342" y2="200"/>
  </g>

  <!-- Central Circular Touch Screen Controller -->
  <circle cx="300" cy="245" r="22" fill="#0f172a" stroke="#cbd5e1" stroke-width="2"/>
  <text x="300" y="251" font-family="'Courier New', monospace" font-weight="bold" font-size="15" fill="#38bdf8" text-anchor="middle">20°C</text>

  <!-- Lower Return Air Intake Grille -->
  <rect x="250" y="280" width="100" height="85" rx="6" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1"/>
  <g stroke="#94a3b8" stroke-width="1.5">
    ${Array.from({ length: 6 }, (_, i) => `<line x1="258" y1="${293 + i * 11}" x2="342" y2="${293 + i * 11}"/>`).join('')}
  </g>
</svg>`;

// 5. Front Load Washing Machine
const wmFrontSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="100%" height="100%">
  <defs>
    <linearGradient id="wmBody" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="100%" stop-color="#e2e8f0"/>
    </linearGradient>
    <linearGradient id="drumGlass" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#1e293b"/>
      <stop offset="40%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#334155"/>
    </linearGradient>
    <filter id="wmShadow">
      <feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#0f172a" flood-opacity="0.15"/>
    </filter>
  </defs>
  <rect width="600" height="450" rx="16" fill="#f8fafc"/>
  <circle cx="300" cy="225" r="175" fill="#f1f5f9"/>

  <!-- Washing Machine Outer Body -->
  <g filter="url(#wmShadow)">
    <rect x="180" y="60" width="240" height="320" rx="16" fill="url(#wmBody)" stroke="#cbd5e1" stroke-width="1.5"/>
    <rect x="195" y="375" width="210" height="8" rx="3" fill="#94a3b8"/>
  </g>

  <!-- Top Control Panel Area -->
  <rect x="190" y="70" width="220" height="65" rx="6" fill="#ffffff" stroke="#e2e8f0" stroke-width="1"/>

  <!-- Left: Detergent Dispenser Drawer -->
  <rect x="198" y="78" width="55" height="48" rx="4" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1"/>
  <text x="225" y="95" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="9" fill="#e60012" text-anchor="middle">HITACHI</text>
  <text x="225" y="112" font-family="sans-serif" font-size="7" fill="#64748b" text-anchor="middle">8.0 KG</text>

  <!-- Center: Jog Dial Program Selector Knob -->
  <circle cx="285" cy="102" r="18" fill="#e2e8f0" stroke="#94a3b8" stroke-width="2"/>
  <circle cx="285" cy="102" r="13" fill="#ffffff"/>
  <line x1="285" y1="89" x2="285" y2="95" stroke="#e60012" stroke-width="3" stroke-linecap="round"/>

  <!-- Right: Digital Touch Display Panel -->
  <rect x="325" y="78" width="78" height="48" rx="4" fill="#0f172a"/>
  <text x="364" y="98" font-family="'Courier New', monospace" font-weight="bold" font-size="14" fill="#38bdf8" text-anchor="middle">0:45</text>
  <text x="364" y="114" font-family="sans-serif" font-size="7" fill="#22c55e" text-anchor="middle">STEAM WASH</text>

  <!-- Giant Porthole Door -->
  <circle cx="300" cy="245" r="92" fill="#cbd5e1" stroke="#94a3b8" stroke-width="2"/>
  <!-- Chrome Outer Ring -->
  <circle cx="300" cy="245" r="82" fill="#475569"/>
  <!-- Dark Glass Porthole -->
  <circle cx="300" cy="245" r="70" fill="url(#drumGlass)"/>
  <!-- Inside stainless drum pattern & water swirl reflection -->
  <circle cx="300" cy="245" r="50" fill="none" stroke="#38bdf8" stroke-width="2" stroke-dasharray="8 6" opacity="0.6"/>
  <path d="M 270 240 Q 300 220 330 245" stroke="#ffffff" stroke-width="3" fill="none" opacity="0.3" stroke-linecap="round"/>

  <!-- Door Handle -->
  <path d="M 370 230 Q 380 245 370 260" stroke="#cbd5e1" stroke-width="6" fill="none" stroke-linecap="round"/>

  <!-- Inverter Motor Badge -->
  <rect x="255" y="348" width="90" height="18" rx="3" fill="#0f172a"/>
  <text x="300" y="360" font-family="sans-serif" font-size="8" font-weight="bold" fill="#ffffff" text-anchor="middle">INVERTER MOTOR</text>
</svg>`;

// 6. Luxury French Door Refrigerator
const refrigFrenchSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="100%" height="100%">
  <defs>
    <linearGradient id="fridgeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#334155"/>
      <stop offset="20%" stop-color="#475569"/>
      <stop offset="70%" stop-color="#334155"/>
      <stop offset="100%" stop-color="#1e293b"/>
    </linearGradient>
    <filter id="fridgeShadow">
      <feDropShadow dx="0" dy="12" stdDeviation="12" flood-color="#0f172a" flood-opacity="0.2"/>
    </filter>
  </defs>
  <rect width="600" height="450" rx="16" fill="#f8fafc"/>
  <circle cx="300" cy="225" r="180" fill="#f1f5f9"/>

  <g filter="url(#fridgeShadow)">
    <!-- Main Refrigerator Body -->
    <rect x="190" y="45" width="220" height="350" rx="12" fill="url(#fridgeGrad)" stroke="#1e293b" stroke-width="1.5"/>
  </g>

  <!-- Top French Doors Split Line -->
  <line x1="300" y1="45" x2="300" y2="230" stroke="#0f172a" stroke-width="2.5"/>

  <!-- Left Door Handle & Right Door Handle -->
  <rect x="290" y="110" width="5" height="70" rx="2" fill="#94a3b8"/>
  <rect x="305" y="110" width="5" height="70" rx="2" fill="#94a3b8"/>

  <!-- Touch Water/Ice Dispenser Panel on Left Door -->
  <rect x="215" y="105" width="60" height="85" rx="6" fill="#0f172a" stroke="#64748b" stroke-width="1"/>
  <rect x="225" y="115" width="40" height="25" rx="3" fill="#1e293b"/>
  <text x="245" y="132" font-family="'Courier New', monospace" font-size="11" font-weight="bold" fill="#38bdf8" text-anchor="middle">-18°</text>
  <line x1="225" y1="150" x2="265" y2="150" stroke="#475569" stroke-width="1"/>
  <path d="M 245 160 L 245 175 M 240 170 L 245 175 L 250 170" stroke="#38bdf8" stroke-width="1.5" fill="none"/>

  <!-- Horizontal Middle Divider between Fridge & Freezer -->
  <line x1="190" y1="230" x2="410" y2="230" stroke="#0f172a" stroke-width="3"/>

  <!-- Middle Pull-out Vegetable / Selectable Zone Drawer -->
  <rect x="194" y="235" width="212" height="60" rx="4" fill="#334155" stroke="#1e293b" stroke-width="1"/>
  <rect x="260" y="240" width="80" height="5" rx="2" fill="#94a3b8"/>
  <text x="300" y="272" font-family="sans-serif" font-size="8.5" fill="#cbd5e1" font-weight="bold" text-anchor="middle">VACUUM COMPARTMENT</text>

  <!-- Bottom Deep Freezer Drawer -->
  <rect x="194" y="302" width="212" height="85" rx="4" fill="#334155" stroke="#1e293b" stroke-width="1"/>
  <rect x="260" y="310" width="80" height="5" rx="2" fill="#94a3b8"/>

  <!-- Top Hitachi Brand Plate -->
  <text x="355" y="70" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="12" fill="#e60012" text-anchor="middle">HITACHI</text>
  <text x="355" y="82" font-family="sans-serif" font-size="7" fill="#cbd5e1" font-weight="bold" text-anchor="middle">DUAL FAN INVERTER</text>
</svg>`;

// 7. Pure Sine Wave Home Inverter & Tubular Battery
const homeInverterSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="100%" height="100%">
  <defs>
    <linearGradient id="invBody" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1e293b"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
    <filter id="invShadow">
      <feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#0f172a" flood-opacity="0.15"/>
    </filter>
  </defs>
  <rect width="600" height="450" rx="16" fill="#f8fafc"/>

  <!-- 1. Home Inverter Unit (Top) -->
  <g filter="url(#invShadow)" transform="translate(130, 60)">
    <rect width="340" height="135" rx="10" fill="url(#invBody)" stroke="#334155" stroke-width="1.5"/>
    <!-- Brand Label -->
    <text x="40" y="45" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="16" fill="#e60012">HITACHI / K.K.</text>
    <text x="40" y="62" font-family="sans-serif" font-weight="bold" font-size="10" fill="#94a3b8">HEAVY-DUTY SINE WAVE INVERTER</text>

    <!-- LCD Display -->
    <rect x="220" y="30" width="95" height="55" rx="6" fill="#020617" stroke="#1e293b" stroke-width="1"/>
    <text x="267" y="55" font-family="'Courier New', monospace" font-size="16" font-weight="bold" fill="#22c55e" text-anchor="middle">230 V</text>
    <text x="267" y="73" font-family="'Courier New', monospace" font-size="10" fill="#38bdf8" text-anchor="middle">BATTERY 100%</text>

    <!-- Air Ventilation Slits -->
    <g stroke="#334155" stroke-width="2">
      <line x1="40" y1="95" x2="160" y2="95"/>
      <line x1="40" y1="105" x2="160" y2="105"/>
      <line x1="40" y1="115" x2="160" y2="115"/>
    </g>
    <!-- Status LEDs -->
    <circle cx="235" cy="105" r="4" fill="#22c55e"/>
    <circle cx="260" cy="105" r="4" fill="#38bdf8"/>
    <circle cx="285" cy="105" r="4" fill="#f59e0b"/>
  </g>

  <!-- 2. Heavy Tubular Battery (Bottom) -->
  <g filter="url(#invShadow)" transform="translate(110, 230)">
    <rect width="380" height="160" rx="8" fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>
    <!-- Top Terminal Cover -->
    <rect x="20" y="-15" width="340" height="20" rx="4" fill="#0f172a"/>
    <!-- Battery Level Float Indicators -->
    ${Array.from({ length: 6 }, (_, i) => `
      <rect x="${55 + i * 50}" y="-30" width="16" height="20" rx="2" fill="#e2e8f0" stroke="#94a3b8" stroke-width="1"/>
      <circle cx="${63 + i * 50}" cy="-20" r="4" fill="#e60012"/>
    `).join('')}

    <!-- Battery Specs and Label -->
    <rect x="40" y="30" width="300" height="100" rx="6" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1"/>
    <text x="190" y="65" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="18" fill="#0f172a" text-anchor="middle">TALL TUBULAR INVERTER BATTERY</text>
    <text x="190" y="85" font-family="sans-serif" font-weight="bold" font-size="12" fill="#e60012" text-anchor="middle">220 Ah / 12V • 60 MONTHS WARRANTY</text>
    <text x="190" y="105" font-family="sans-serif" font-size="10" fill="#64748b" text-anchor="middle">Suitable for 1.5T Inverter AC + Fans & Lighting Backup</text>
  </g>

  <!-- Heavy Connecting Cables -->
  <path d="M 230 195 C 230 215 180 210 180 230" stroke="#dc2626" stroke-width="6" fill="none"/>
  <path d="M 370 195 C 370 215 420 210 420 230" stroke="#1e293b" stroke-width="6" fill="none"/>
</svg>`;

fs.writeFileSync(path.join(assetsDir, 'window_ac_kaze.svg'), windowAcSvg);
fs.writeFileSync(path.join(assetsDir, 'cassette_ac.svg'), cassetteAcSvg);
fs.writeFileSync(path.join(assetsDir, 'vrf_system.svg'), vrfOutdoorSvg);
fs.writeFileSync(path.join(assetsDir, 'tower_ac.svg'), towerAcSvg);
fs.writeFileSync(path.join(assetsDir, 'washing_machine_front.svg'), wmFrontSvg);
fs.writeFileSync(path.join(assetsDir, 'refrigerator_french.svg'), refrigFrenchSvg);
fs.writeFileSync(path.join(assetsDir, 'home_inverter.svg'), homeInverterSvg);

console.log('All product vector visual assets successfully written to public/assets!');
