# OvarTaci SwipeStory

Interaktiv SVG-baseret scrollfortælling om Ovartacis liv.

Projektet består af én samlet pakke indeholdende `index.html` `style.css` `ovartaci.js` samt `/assets`, som indeholder:

- HTML
- CSS
- JavaScript
- SVG-assets

Løsningen er designet til kiosk- og udstillingsbrug og kræver ingen backend.

Denne README er over opbygningen af hele swipestories.

Projektet bestod oprindeligt af én samlet index.html-fil. Den første version fyldte ca. 3.4mb hovedsageligt SVG. Det er en stor fil, men den er ekstremt god hvis det hele bare skal køre i en loop og der ikke tilføjes yderligere som login ex. så vokser den hurtigt op i en alt for stor størrelse og kompleksitet.

Projektets HTML er senest valideret 5. juni kl. 16:39 uden fejl.

Vores system er bygget op i hud og world direkte i body.
    - .hud (Heads-Up Display) & årstal kører her. 
    - .world - dette er hele verden, hvor scroll eventet foregår.
        - .node - vi har en node for hvert svg element, noden har inline styling(left, top, width) så vi kan arbejde simpelt med det. 
            - svg for hvert element vi henter i vores figma og eksporteres altid som svg (vores pt. design regel, kan ændres til video, lyd mm.)

## Frameworks
Under udviklingen blev frameworket Scroll SVG undersøgt:
https://www.pulber.dev/scroll-svg

Det blev vurderet, at en egen implementering ville give større fleksibilitet og bedre indsigt i den underliggende funktionalitet.

Projektet benytter derfor ingen frameworks.

## Teknologier
- HTML5
- CSS3
- Vanilla JavaScript
- SVG
- Figma (design og eksport)

## Struktur

body
├── .hud
│   ├── årstal
│   └── UI-elementer
│
└── .world
    ├── .node
    │   └── SVG
    ├── .node
    │   └── SVG
    └── ...

I vores html er der en kommentar over hver svg og det rådes at kollapse alle .node eller svg'er når du arbjeder med filen.

# Det anbefales at folde .node- og SVG-elementer sammen i editoren under arbejde med filen.



# EKSEMPEL

        <!-- foedt-->
        <div class="node" style="left:3%;top:230px;width:350px;" data-start="0.02">
            <svg stroke="#fff" width="1520" height="282" viewBox="0 0 1520 282" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M4.75 1...................utroligt meget Scaleable Vector Graphics ................" 
                    fill="black" />
            </svg>
        </div>

        <!-- element n -->
        <div class="node" style="left:3%;top:230px;width:350px;" data-start="0.02">
            <svg></svg>
        </div>

        <!-- og så videre gennem hele ovartacis liv.. -->
        <div class="node" style="left:3%;top:230px;width:350px;" data-start="0.02">
            <svg></svg>
        </div>

# the engine

function applyTheme(isBlackWhite)*
- Dette er vores localstorage solution med farvetema, 
der kan være småting der ikke er helt på plads endnu i darktemaet.

function updateScene()*
- Dette er her vores scroll måles og data-start="0.02" måles og toggler .revealed på efter hvor swipestorien

function stopMomentum()*
- Dette er en ren kode der går sammen med startMomentum funktionen også,

function startMomentum(velocity)*

function showPauseScreen()*
- Viser en pauseskærm ved inaktivitet.
- Efter en given periode nulstilles oplevelsen ved at sætte scroll-positionen tilbage til start.
- Formålet er at sikre, at nye besøgende altid møder værket fra begyndelsen.

function hidePauseScreen()*
- Det virker ved click på skærmen,

function resetIdleTimer()
- Dette er en timer der hele tiden kører, den nulstilles ved hver interaktion med skærmen, sker det at den ikke interageres med i x sekunder så aktiveres showPauseScreen()*

*Funktionen er udviklet med assistance fra AI-værktøjer
(Copilot/ChatGPT) og efterfølgende tilpasset til projektets behov.

# Elementer i .world

        LINE PATH 

        Jylland 

        foedt

        udlaet maler

        Argentina 

        1923

        det vilde eventyr

        929

        Risskov 

        risskov tekst

        Ovartaci 

        demonskjold

        tekst til deomonskjold

        Missekat 

        selvvalgt amputering 

        tekst til amputering

        indgreb bevilliget 

        ingreb tekst

        Sommmerfugl

        som kvinde i 15 år 

        helikopter 

        helikopter tekst

        fantompiberne salg foran salling

        Kvinde 15år - fortrød 

        Art Brut 

        gravsted  

        image of him 

        Thanks to many ovartaci's 


   ___                 _____          _                        
  / _ \__   ____ _ _ _|_   _|_ _  ___(_)                       
 | | | \ \ / / _` | '__|| |/ _` |/ __| |                       
 | |_| |\ V / (_| | |   | | (_| | (__| |                       
  \___/  \_/ \__,_|_|   |_|\__,_|\___|_|                       
  ____          _            ____  _             _             
 / ___|_      _(_)_ __   ___/ ___|| |_ ___  _ __(_) ___  ___   
 \___ \ \ /\ / / | '_ \ / _ \___ \| __/ _ \| '__| |/ _ \/ __|  
  ___) \ V  V /| | |_) |  __/___) | || (_) | |  | |  __/\__ \_ 
 |____/ \_/\_/ |_| .__/ \___|____/ \__\___/|_|  |_|\___||___(_)
                 |_|                                           