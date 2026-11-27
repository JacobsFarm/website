/**
 * Every setting of the AI Detector's config.json, taken from the generated
 * schema (config/config.schema.json) of the latest release, with an
 * explanation in English and Dutch. Other languages show the English text.
 *
 * `path` is where the key sits inside one detector (or at the top level for
 * `onnx` and `health`); `id` is the anchor on the page.
 *
 * @typedef {{ en: string, nl: string }} Text
 * @typedef {{ key: string, type: string, default?: string, required?: boolean, limits?: string, desc: Text }} Field
 * @typedef {{ id: string, path: string, title: Text, intro: Text, fields: Field[], example?: string }} Section
 */

/** @type {Section[]} */
export const sections = [
	{
		id: 'top',
		path: '{ … }',
		title: { en: 'Top level', nl: 'Hoofdniveau' },
		intro: {
			en: 'The file itself is one JSON object with at most these four keys. Only <code>detectors</code> is required.',
			nl: 'Het bestand zelf is één JSON-object met hooguit deze vier sleutels. Alleen <code>detectors</code> is verplicht.'
		},
		fields: [
			{
				key: 'detectors',
				type: 'array',
				required: true,
				limits: '≥ 1',
				desc: {
					en: 'The list of detectors. Each detector is one object with <code>detection</code>, <code>yolo</code>, <code>vlm</code> and <code>exporters</code>. The order is the order in the app; the name of a detector is kept in <code>app.json</code>, not here.',
					nl: 'De lijst met detectoren. Elke detector is één object met <code>detection</code>, <code>yolo</code>, <code>vlm</code> en <code>exporters</code>. De volgorde is die in de app; de naam van een detector staat in <code>app.json</code>, niet hier.'
				}
			},
			{
				key: 'onnx',
				type: 'object',
				desc: {
					en: 'Settings for the detection engine on Windows and Linux. See <a href="#onnx">onnx</a>. Normally left out.',
					nl: 'Instellingen voor de detectie-engine op Windows en Linux. Zie <a href="#onnx">onnx</a>. Meestal weggelaten.'
				}
			},
			{
				key: 'health',
				type: 'object | null',
				default: 'null',
				desc: {
					en: 'A heartbeat: an address the detector calls while it runs, so a service such as Healthchecks.io can warn you when it stops. See <a href="#health">health</a>.',
					nl: 'Een hartslag: een adres dat de detector aanroept zolang hij draait, zodat een dienst als Healthchecks.io je waarschuwt als hij stopt. Zie <a href="#health">health</a>.'
				}
			},
			{
				key: '$schema',
				type: 'string | null',
				default: 'null',
				desc: {
					en: 'Optional link to the schema, so an editor such as VS Code can check the file and suggest keys while you type. Has no effect on detection.',
					nl: 'Optionele link naar het schema, zodat een editor als VS Code het bestand controleert en sleutels voorstelt tijdens het typen. Heeft geen invloed op de detectie.'
				}
			}
		]
	},
	{
		id: 'detection',
		path: 'detectors[ ].detection',
		title: { en: 'detection — cameras and sampling', nl: 'detection — camera’s en beelden' },
		intro: {
			en: 'Which cameras a detector watches and how often it looks. Required in every detector. The app fills in <code>source</code> when you tick cameras in the detector editor.',
			nl: 'Welke camera’s een detector bekijkt en hoe vaak hij kijkt. Verplicht in elke detector. De app vult <code>source</code> in als je camera’s aanvinkt in de detector-editor.'
		},
		fields: [
			{
				key: 'source',
				type: 'string | string[]',
				required: true,
				desc: {
					en: 'One camera or a list. An RTSP or HTTP stream (<code>rtsp://user:pass@192.168.1.20:554/…</code>), a local image or video file, an HTTP video, or a camera index as text such as <code>"0"</code>. Each source may appear only once per detector. Detectors that use exactly the same address share one camera connection.',
					nl: 'Eén camera of een lijst. Een RTSP- of HTTP-stream (<code>rtsp://user:pass@192.168.1.20:554/…</code>), een lokaal foto- of videobestand, een HTTP-video, of een cameranummer als tekst zoals <code>"0"</code>. Elke bron mag maar één keer per detector voorkomen. Detectoren met precies hetzelfde adres delen één cameraverbinding.'
				}
			},
			{
				key: 'interval',
				type: 'number (seconds)',
				default: '0',
				limits: '≥ 0',
				desc: {
					en: 'Minimum time between two analysed pictures. <code>0</code> analyses as fast as the computer can. Calving Catcher uses <code>1</code>, its Low Power mode <code>5</code>. A higher value asks less of the computer but notices an event later.',
					nl: 'Minimale tijd tussen twee geanalyseerde beelden. <code>0</code> analyseert zo snel als de computer kan. Calving Catcher gebruikt <code>1</code>, de Low Power-modus <code>5</code>. Een hogere waarde vraagt minder van de computer, maar merkt een gebeurtenis later op.'
				}
			},
			{
				key: 'frame_retention',
				type: 'integer',
				default: '15',
				limits: '> 0',
				desc: {
					en: 'How many pictures per camera are kept for each evaluation: the newest is analysed, the earlier ones give context and make the event video smooth.',
					nl: 'Hoeveel beelden per camera worden bewaard bij elke beoordeling: het nieuwste wordt geanalyseerd, de eerdere geven context en zorgen voor een vloeiende gebeurtenisvideo.'
				}
			},
			{
				key: 'frames_width',
				type: 'integer (pixels)',
				default: '1280',
				limits: '≥ 2',
				desc: {
					en: 'Maximum width of the pictures. Larger pictures are scaled down with the same aspect ratio; smaller ones are never enlarged. Tail Up uses <code>2560</code> to see tails from further away.',
					nl: 'Maximale breedte van de beelden. Grotere beelden worden verkleind met dezelfde verhouding; kleinere worden nooit vergroot. Tail Up gebruikt <code>2560</code> om staarten op grotere afstand te zien.'
				}
			},
			{
				key: 'areas',
				type: 'object',
				desc: {
					en: 'Watch only part of a picture. Per source (the same text as in <code>source</code>), a list of at least three corners <code>[x, y]</code>, as fractions from 0 to 1 of the width and height. A detection counts only when the middle of its box is inside. Easiest to draw in the detector editor under <em>Whole picture</em>.',
					nl: 'Bekijk maar een deel van het beeld. Per bron (dezelfde tekst als in <code>source</code>) een lijst van minstens drie hoeken <code>[x, y]</code>, als fractie van 0 tot 1 van de breedte en hoogte. Een detectie telt alleen als het midden van het vak erbinnen valt. Het makkelijkst te tekenen in de detector-editor onder <em>Hele beeld</em>.'
				}
			}
		],
		example: `"detection": {
  "source": [
    "rtsp://admin:PASSWORD@192.168.1.21:554/h264Preview_01_sub",
    "rtsp://admin:PASSWORD@192.168.1.22:554/h264Preview_01_sub"
  ],
  "interval": 1,
  "areas": {
    "rtsp://admin:PASSWORD@192.168.1.21:554/h264Preview_01_sub": [
      [0.05, 0.30], [0.95, 0.30], [0.95, 1.00], [0.05, 1.00]
    ]
  }
}`
	},
	{
		id: 'yolo',
		path: 'detectors[ ].yolo',
		title: { en: 'yolo — the AI model and event rules', nl: 'yolo — het AI-model en de regels' },
		intro: {
			en: 'The vision model and when a series of detections becomes one event (a recording and an alert). These are the settings you change most often, for example for the calf or for fewer false alarms.',
			nl: 'Het beeldherkenningsmodel en wanneer een reeks detecties één gebeurtenis wordt (een opname en een melding). Dit zijn de instellingen die je het vaakst aanpast, bijvoorbeeld voor het kalf of tegen valse meldingen.'
		},
		fields: [
			{
				key: 'model',
				type: 'string',
				required: true,
				desc: {
					en: 'The model: a web address (as in the presets), a local <code>.pt</code>, <code>.onnx</code> or <code>.engine</code> file, or a standard Ultralytics name such as <code>yolo26m.pt</code>. Downloaded once and then prepared for your hardware.',
					nl: 'Het model: een webadres (zoals in de presets), een lokaal <code>.pt</code>-, <code>.onnx</code>- of <code>.engine</code>-bestand, of een standaard Ultralytics-naam zoals <code>yolo26m.pt</code>. Wordt één keer gedownload en daarna voorbereid voor jouw hardware.'
				}
			},
			{
				key: 'confidence',
				type: 'number | { class: number }',
				default: '0',
				limits: '0 – 1',
				desc: {
					en: 'How sure the AI must be. One number for every class, or a map per class such as <code>{"calf": 0.85, "legs": 0.65}</code>. A map also <strong>selects</strong> classes: classes that are not in it are ignored. Higher means fewer but surer alerts. Always use a decimal point: <code>0.85</code>, not <code>0,85</code>.',
					nl: 'Hoe zeker de AI moet zijn. Eén getal voor alle klassen, of per klasse zoals <code>{"calf": 0.85, "legs": 0.65}</code>. Zo’n lijst <strong>kiest</strong> ook de klassen: klassen die er niet in staan, worden genegeerd. Hoger betekent minder maar zekerdere meldingen. Gebruik altijd een punt: <code>0.85</code>, niet <code>0,85</code>.'
				}
			},
			{
				key: 'frames_min',
				type: 'integer',
				default: '3',
				limits: '> 0',
				desc: {
					en: 'How many matching pictures an event needs before it is recorded and alerted. They do not need to be in a row. Higher filters out short glitches; Calving Catcher uses <code>10</code>, Tail Up <code>24</code>.',
					nl: 'Hoeveel overeenkomende beelden een gebeurtenis nodig heeft voordat er een opname en melding komt. Ze hoeven niet achter elkaar te zijn. Hoger filtert korte vergissingen; Calving Catcher gebruikt <code>10</code>, Tail Up <code>24</code>.'
				}
			},
			{
				key: 'cooldown',
				type: 'number | { class: number } (seconds)',
				default: '0',
				limits: '≥ 0',
				desc: {
					en: 'Quiet time per camera after an event, in seconds, for all classes or per class. During the cooldown that class gives no new alert. Calving Catcher uses <code>900</code> (15 minutes); <code>86400</code> is one day. Rejected and failed events do not start a cooldown.',
					nl: 'Rusttijd per camera na een gebeurtenis, in seconden, voor alle klassen of per klasse. Tijdens de cooldown geeft die klasse geen nieuwe melding. Calving Catcher gebruikt <code>900</code> (15 minuten); <code>86400</code> is één dag. Afgekeurde en mislukte gebeurtenissen starten geen cooldown.'
				}
			},
			{
				key: 'timeout',
				type: 'number (seconds)',
				default: '5',
				limits: '≥ 0',
				desc: {
					en: 'An event ends when nothing matching has been seen for this long. <code>0</code> switches this off.',
					nl: 'Een gebeurtenis eindigt als er zo lang niets overeenkomends is gezien. <code>0</code> zet dit uit.'
				}
			},
			{
				key: 'time_max',
				type: 'number (seconds)',
				default: '60',
				limits: '> 0',
				desc: {
					en: 'Maximum length of one event, counted from the first matching picture. Also limits the length of the recorded video.',
					nl: 'Maximale duur van één gebeurtenis, gerekend vanaf het eerste overeenkomende beeld. Begrenst ook de lengte van de opgenomen video.'
				}
			},
			{
				key: 'include_trailing_time',
				type: 'number (seconds)',
				default: '1',
				limits: '≥ 0',
				desc: {
					en: 'How much video after the last match is added to the recording.',
					nl: 'Hoeveel video na de laatste overeenkomst aan de opname wordt toegevoegd.'
				}
			},
			{
				key: 'imgsz',
				type: 'integer (pixels)',
				default: '640',
				limits: '> 0',
				desc: {
					en: 'The size the picture is scaled to for the model. Leave it at <code>640</code> unless a preset says otherwise: the models are trained at this size.',
					nl: 'De grootte waarop het beeld voor het model wordt geschaald. Laat op <code>640</code> tenzij een preset iets anders zegt: de modellen zijn op deze grootte getraind.'
				}
			},
			{
				key: 'task',
				type: '"detect" | "segment"',
				default: '"detect"',
				desc: {
					en: 'Must match the model. All CowCatcher AI models are <code>detect</code> models.',
					nl: 'Moet bij het model passen. Alle CowCatcher AI-modellen zijn <code>detect</code>-modellen.'
				}
			},
			{
				key: 'tracking',
				type: 'boolean',
				default: 'false',
				desc: {
					en: 'Follows the same object from picture to picture (Ultralytics tracking). Not needed for the presets.',
					nl: 'Volgt hetzelfde object van beeld tot beeld (Ultralytics-tracking). Niet nodig voor de presets.'
				}
			}
		],
		example: `"yolo": {
  "model": "https://github.com/CowCatcherAI/CalvingCatcherAI/releases/download/CalvingcatcherV1/calvingcatcherV11.pt",
  "confidence": { "waterbag": 0.65, "legs": 0.65, "head": 0.65, "body": 0.65, "calf": 0.85 },
  "cooldown":   { "waterbag": 900,  "legs": 900,  "head": 900,  "body": 900,  "calf": 86400 },
  "frames_min": 10,
  "timeout": 30
}`
	},
	{
		id: 'vlm',
		path: 'detectors[ ].vlm',
		title: { en: 'vlm — the AI check', nl: 'vlm — de AI-controle' },
		intro: {
			en: 'An optional second opinion: a vision language model (such as Google Gemini) watches the clip and answers a yes/no question before you are alerted. One object or a list; entries are tried in order. Only entries with a <code>key</code> that is not <code>null</code> run.',
			nl: 'Een optionele tweede mening: een vision language model (zoals Google Gemini) bekijkt de clip en beantwoordt een ja/nee-vraag voordat je een melding krijgt. Eén object of een lijst; de items worden op volgorde geprobeerd. Alleen items met een <code>key</code> die niet <code>null</code> is, draaien.'
		},
		fields: [
			{
				key: 'prompt',
				type: 'string',
				required: true,
				desc: {
					en: 'The question, for example <em>“Is one cow mounting another cow in this video?”</em>. Write what to look for and what to ignore. The model answers only <code>{"detected": true}</code> or <code>false</code>.',
					nl: 'De vraag, bijvoorbeeld <em>“Bespringt een koe een andere koe in deze video?”</em>. Schrijf op waar het model op moet letten en wat het moet negeren. Het model antwoordt alleen <code>{"detected": true}</code> of <code>false</code>.'
				}
			},
			{
				key: 'key',
				type: 'string | null',
				default: 'null',
				desc: {
					en: 'The API key of the provider. <code>null</code> switches this check off and keeps the question. <code>""</code> (empty) is for a local service without a key, such as Ollama.',
					nl: 'De API-sleutel van de aanbieder. <code>null</code> zet deze controle uit en bewaart de vraag. <code>""</code> (leeg) is voor een lokale dienst zonder sleutel, zoals Ollama.'
				}
			},
			{
				key: 'model',
				type: 'string | string[]',
				required: false,
				desc: {
					en: 'Required as soon as there is a key. A LiteLLM model name such as <code>gemini/gemini-3.8-flash</code>, or a list that is tried in order when a model fails.',
					nl: 'Verplicht zodra er een sleutel is. Een LiteLLM-modelnaam zoals <code>gemini/gemini-3.8-flash</code>, of een lijst die op volgorde wordt geprobeerd als een model faalt.'
				}
			},
			{
				key: 'strategy',
				type: '"VIDEO" | "IMAGE"',
				default: '"VIDEO"',
				desc: {
					en: '<code>VIDEO</code> sends the event clip, <code>IMAGE</code> only the best cropped picture (cheaper and faster, less context).',
					nl: '<code>VIDEO</code> stuurt de gebeurtenisclip, <code>IMAGE</code> alleen het beste uitgesneden beeld (goedkoper en sneller, minder context).'
				}
			},
			{
				key: 'url',
				type: 'string | null',
				default: 'null',
				desc: {
					en: 'Address of the provider, for a self-hosted or non-standard service (for example <code>http://localhost:11434</code> for Ollama).',
					nl: 'Adres van de aanbieder, voor een eigen of afwijkende dienst (bijvoorbeeld <code>http://localhost:11434</code> voor Ollama).'
				}
			},
			{
				key: 'headers',
				type: '{ name: value }',
				desc: { en: 'Extra HTTP headers for the provider.', nl: 'Extra HTTP-headers voor de aanbieder.' }
			},
			{
				key: 'crop_padding',
				type: 'number',
				default: '0.1',
				limits: '≥ 0',
				desc: {
					en: 'Extra margin around the detection when a picture is cropped (0.1 = 10 %).',
					nl: 'Extra marge rond de detectie als een beeld wordt uitgesneden (0.1 = 10 %).'
				}
			},
			{
				key: 'timeout',
				type: 'number (seconds)',
				default: '30',
				limits: '> 0',
				desc: { en: 'How long to wait for an answer.', nl: 'Hoe lang er op een antwoord wordt gewacht.' }
			},
			{
				key: 'attempts',
				type: 'integer',
				default: '3',
				limits: '> 0',
				desc: {
					en: 'Attempts per model when a provider is temporarily unavailable.',
					nl: 'Pogingen per model als een aanbieder tijdelijk niet bereikbaar is.'
				}
			}
		],
		example: `"vlm": {
  "key": "YOUR-GEMINI-API-KEY",
  "model": ["gemini/gemini-3.8-flash", "gemini/gemini-3.5-flash"],
  "prompt": "Is one cow mounting another cow in this video? Set detected to true only when the posture clearly shows it.",
  "strategy": "VIDEO"
}`
	},
	{
		id: 'disk',
		path: 'detectors[ ].exporters.disk',
		title: { en: 'exporters.disk — recordings on your computer', nl: 'exporters.disk — opnamen op je computer' },
		intro: {
			en: 'Where and how events are saved. Recordings appear under <code>detections/&lt;category&gt;/&lt;approved|rejected|unvalidated&gt;/&lt;time&gt;/</code> in the data folder, with <code>best.jpg</code>, <code>clean.jpg</code>, <code>video.mp4</code> and <code>metadata.json</code>. One object, a list, or <code>null</code> for no recordings.',
			nl: 'Waar en hoe gebeurtenissen worden opgeslagen. Opnamen komen in <code>detections/&lt;categorie&gt;/&lt;approved|rejected|unvalidated&gt;/&lt;tijd&gt;/</code> in de datamap, met <code>best.jpg</code>, <code>clean.jpg</code>, <code>video.mp4</code> en <code>metadata.json</code>. Eén object, een lijst, of <code>null</code> voor geen opnamen.'
		},
		fields: [
			{
				key: 'directory',
				type: 'string | null',
				default: 'null',
				desc: {
					en: 'The category: one folder name, such as <code>mounts</code>, <code>calvings</code> or <code>dry cows</code>. No slashes or colons. Without it, the best class is used. The app shows it as the category chip in Recordings.',
					nl: 'De categorie: één mapnaam, zoals <code>mounts</code>, <code>calvings</code> of <code>dry cows</code>. Zonder schuine strepen of dubbele punten. Zonder waarde wordt de beste klasse gebruikt. De app toont het als categorie-chip in Opnamen.'
				}
			},
			{
				key: 'strategy',
				type: '"BEST" | "ALL"',
				default: '"BEST"',
				desc: {
					en: '<code>BEST</code> saves the best picture and the clip; <code>ALL</code> also writes every picture of the event (uses much more disk space).',
					nl: '<code>BEST</code> bewaart het beste beeld en de clip; <code>ALL</code> schrijft ook elk beeld van de gebeurtenis weg (kost veel meer schijfruimte).'
				}
			},
			{
				key: 'export_rejected',
				type: 'boolean',
				default: 'true',
				desc: {
					en: 'Also keep events the AI check rejected (in <code>rejected/</code>), so you can review them.',
					nl: 'Bewaar ook gebeurtenissen die de AI-controle afkeurde (in <code>rejected/</code>), zodat je ze kunt nakijken.'
				}
			},
			{
				key: 'confidence',
				type: 'number | { class: number } | null',
				default: 'null',
				limits: '0 – 1',
				desc: {
					en: 'An extra threshold for this destination only, for example to save only the surest events.',
					nl: 'Een extra drempel alleen voor deze bestemming, bijvoorbeeld om alleen de zekerste gebeurtenissen te bewaren.'
				}
			},
			{
				key: 'crop_padding',
				type: 'number',
				default: '0.1',
				limits: '≥ 0',
				desc: { en: 'Margin around the cropped picture.', nl: 'Marge rond het uitgesneden beeld.' }
			}
		]
	},
	{
		id: 'telegram',
		path: 'detectors[ ].exporters.telegram',
		title: { en: 'exporters.telegram — alerts on your phone', nl: 'exporters.telegram — meldingen op je telefoon' },
		intro: {
			en: 'One object per recipient, or a list for several chats. Easiest through <em>Connect Telegram</em> in the app, which fills in <code>token</code> and <code>chat</code> for you. Alerts carry 👍 and 👎 buttons. Photos are limited to 10 MB and videos to 12 MB.',
			nl: 'Eén object per ontvanger, of een lijst voor meerdere chats. Het makkelijkst via <em>Telegram koppelen</em> in de app, die <code>token</code> en <code>chat</code> voor je invult. Meldingen hebben 👍- en 👎-knoppen. Foto’s mogen maximaal 10 MB zijn en video’s 12 MB.'
		},
		fields: [
			{
				key: 'token',
				type: 'string',
				required: true,
				desc: {
					en: 'The bot token from BotFather, such as <code>123456789:AA…</code>. Keep it private.',
					nl: 'Het bot-token van BotFather, zoals <code>123456789:AA…</code>. Houd het geheim.'
				}
			},
			{
				key: 'chat',
				type: 'string',
				required: true,
				desc: {
					en: 'The chat ID of the person, group or channel, as text. Group and channel IDs start with <code>-100</code>.',
					nl: 'Het chat-ID van de persoon, groep of het kanaal, als tekst. Groeps- en kanaal-ID’s beginnen met <code>-100</code>.'
				}
			},
			{
				key: 'quiet',
				type: '{ start, end } | null',
				default: 'null',
				desc: {
					en: 'Quiet hours, such as <code>{"start": "22:00", "end": "06:00"}</code> in the computer’s local time (24-hour, may pass midnight). Alerts in that period arrive without sound — they still arrive.',
					nl: 'Stille uren, zoals <code>{"start": "22:00", "end": "06:00"}</code> in de lokale tijd van de computer (24-uurs, mag over middernacht). Meldingen in die periode komen zonder geluid binnen — ze komen wel.'
				}
			},
			{
				key: 'alert_every',
				type: 'integer',
				default: '1',
				limits: '> 0',
				desc: {
					en: 'Play the sound on every Nth alert only. <code>3</code> = every alert arrives, every third one with sound.',
					nl: 'Alleen bij elke N-de melding geluid. <code>3</code> = elke melding komt binnen, elke derde met geluid.'
				}
			},
			{
				key: 'include_video',
				type: 'boolean',
				default: 'true',
				desc: { en: 'Send the short clip of the event.', nl: 'Stuur de korte clip van de gebeurtenis mee.' }
			},
			{
				key: 'include_plot',
				type: 'boolean',
				default: 'false',
				desc: {
					en: 'Send the full picture with the detection box drawn on it. The calving presets switch this on and the video off.',
					nl: 'Stuur het volledige beeld met het detectievak erop. De afkalf-presets zetten dit aan en de video uit.'
				}
			},
			{
				key: 'include_crop',
				type: 'boolean',
				default: 'false',
				desc: { en: 'Send a close-up of the detection, with its box.', nl: 'Stuur een uitsnede van de detectie, met het vak.' }
			},
			{
				key: 'include_image',
				type: 'boolean',
				default: 'false',
				desc: { en: 'Send the full picture without drawings.', nl: 'Stuur het volledige beeld zonder tekeningen.' }
			},
			{
				key: 'video_width',
				type: 'integer | null',
				default: '1280',
				limits: '≥ 2',
				desc: {
					en: 'Width of the video that is sent. Smaller is faster on a weak mobile connection.',
					nl: 'Breedte van de verstuurde video. Kleiner is sneller bij een zwakke mobiele verbinding.'
				}
			},
			{
				key: 'video_crf',
				type: 'integer',
				default: '28',
				limits: '0 – 51',
				desc: {
					en: 'Video quality: lower is sharper and larger. <code>28</code> is a good balance.',
					nl: 'Videokwaliteit: lager is scherper en groter. <code>28</code> is een goede balans.'
				}
			},
			{
				key: 'timeout',
				type: 'number (seconds)',
				default: '30',
				limits: '> 0',
				desc: { en: 'How long sending may take.', nl: 'Hoe lang het versturen mag duren.' }
			},
			{
				key: 'export_rejected',
				type: 'boolean',
				default: 'false',
				desc: {
					en: 'Also alert about events the AI check rejected.',
					nl: 'Ook een melding sturen bij gebeurtenissen die de AI-controle afkeurde.'
				}
			},
			{
				key: 'confidence',
				type: 'number | { class: number } | null',
				default: 'null',
				limits: '0 – 1',
				desc: {
					en: 'A higher threshold for this recipient only: everything is recorded, but this chat is alerted only above this value.',
					nl: 'Een hogere drempel alleen voor deze ontvanger: alles wordt opgenomen, maar deze chat krijgt alleen boven deze waarde een melding.'
				}
			},
			{
				key: 'crop_padding',
				type: 'number',
				default: '0.1',
				limits: '≥ 0',
				desc: { en: 'Margin around the close-up.', nl: 'Marge rond de uitsnede.' }
			}
		],
		example: `"telegram": [
  {
    "token": "123456789:AAExampleTokenFromBotFather",
    "chat": "-1001234567890",
    "quiet": { "start": "22:00", "end": "06:00" }
  },
  {
    "token": "123456789:AAExampleTokenFromBotFather",
    "chat": "987654321",
    "include_video": false,
    "include_plot": true,
    "confidence": 0.92
  }
]`
	},
	{
		id: 'webhook',
		path: 'detectors[ ].exporters.webhook',
		title: { en: 'exporters.webhook — send events to other software', nl: 'exporters.webhook — gebeurtenissen naar andere software' },
		intro: {
			en: 'Calls a web address for every event, for example Home Assistant, Node-RED, a farm management system or a siren with a web switch (such as a Shelly). One object or a list. The data always includes <code>confidence</code>, <code>timestamp</code>, <code>duration</code> and <code>validated</code>.',
			nl: 'Roept bij elke gebeurtenis een webadres aan, bijvoorbeeld Home Assistant, Node-RED, een bedrijfsmanagementsysteem of een sirene met een webschakelaar (zoals een Shelly). Eén object of een lijst. De gegevens bevatten altijd <code>confidence</code>, <code>timestamp</code>, <code>duration</code> en <code>validated</code>.'
		},
		fields: [
			{
				key: 'url',
				type: 'string',
				required: true,
				desc: { en: 'The address to call.', nl: 'Het adres dat wordt aangeroepen.' }
			},
			{
				key: 'method',
				type: '"GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD"',
				default: '"POST"',
				desc: { en: 'The HTTP method. A simple switch often only needs <code>GET</code>.', nl: 'De HTTP-methode. Een simpele schakelaar heeft vaak genoeg aan <code>GET</code>.' }
			},
			{
				key: 'data_type',
				type: '"binary" | "base64" | "none" | "file"',
				default: '"binary"',
				desc: {
					en: '<code>binary</code>: form fields with files. <code>base64</code>: JSON with the files encoded. <code>none</code>: no content. <code>file</code>: the first chosen picture or video as the whole body.',
					nl: '<code>binary</code>: formuliervelden met bestanden. <code>base64</code>: JSON met de bestanden gecodeerd. <code>none</code>: geen inhoud. <code>file</code>: het eerste gekozen beeld of de video als hele inhoud.'
				}
			},
			{
				key: 'headers',
				type: '{ name: value } | null',
				default: 'null',
				desc: { en: 'Extra HTTP headers.', nl: 'Extra HTTP-headers.' }
			},
			{
				key: 'token',
				type: 'string | null',
				default: 'null',
				desc: {
					en: 'Sent as the <code>Authorization</code> header, for example <code>Bearer abc123</code> for Home Assistant.',
					nl: 'Wordt meegestuurd als <code>Authorization</code>-header, bijvoorbeeld <code>Bearer abc123</code> voor Home Assistant.'
				}
			},
			{
				key: 'body',
				type: 'string | null',
				default: 'null',
				desc: { en: 'Your own content instead of the generated content.', nl: 'Eigen inhoud in plaats van de gegenereerde inhoud.' }
			},
			{
				key: 'data_max',
				type: 'integer (bytes) | null',
				default: 'null',
				limits: '> 0',
				desc: { en: 'Maximum size per attachment.', nl: 'Maximale grootte per bijlage.' }
			},
			{
				key: 'include_crop',
				type: 'boolean',
				default: 'true',
				desc: { en: 'Attach the close-up with its box.', nl: 'Voeg de uitsnede met vak toe.' }
			},
			{
				key: 'include_plot',
				type: 'boolean',
				default: 'false',
				desc: { en: 'Attach the full picture with the box.', nl: 'Voeg het volledige beeld met vak toe.' }
			},
			{
				key: 'include_image',
				type: 'boolean',
				default: 'false',
				desc: { en: 'Attach the full picture without drawings.', nl: 'Voeg het volledige beeld zonder tekeningen toe.' }
			},
			{
				key: 'include_video',
				type: 'boolean',
				default: 'false',
				desc: { en: 'Attach the clip.', nl: 'Voeg de clip toe.' }
			},
			{
				key: 'video_width · video_crf',
				type: 'integer',
				default: '1280 · 28',
				desc: { en: 'Size and quality of an attached video, as for Telegram.', nl: 'Grootte en kwaliteit van een meegestuurde video, net als bij Telegram.' }
			},
			{
				key: 'timeout',
				type: 'number (seconds)',
				default: '30',
				limits: '> 0',
				desc: { en: 'How long the call may take.', nl: 'Hoe lang de aanroep mag duren.' }
			},
			{
				key: 'export_rejected · confidence · crop_padding',
				type: '—',
				default: 'false · null · 0.1',
				desc: { en: 'As for Telegram.', nl: 'Net als bij Telegram.' }
			}
		],
		example: `"webhook": {
  "url": "http://homeassistant.local:8123/api/webhook/cowcatcher-heat",
  "method": "POST",
  "data_type": "base64",
  "include_crop": true
}`
	},
	{
		id: 'onnx',
		path: 'onnx',
		title: { en: 'onnx — detection engine (top level)', nl: 'onnx — detectie-engine (hoofdniveau)' },
		intro: {
			en: 'Next to <code>detectors</code>, not inside a detector. Only for special cases: the app picks the fastest engine by itself.',
			nl: 'Naast <code>detectors</code>, niet binnen een detector. Alleen voor bijzondere gevallen: de app kiest zelf de snelste engine.'
		},
		fields: [
			{
				key: 'provider',
				type: 'string | null',
				default: 'null',
				desc: {
					en: 'Ask for a specific installed ONNX Runtime provider, for example <code>"WebGpuExecutionProvider"</code> on Windows ML.',
					nl: 'Vraag om een specifieke geïnstalleerde ONNX Runtime-provider, bijvoorbeeld <code>"WebGpuExecutionProvider"</code> op Windows ML.'
				}
			},
			{
				key: 'winml',
				type: 'boolean',
				default: 'true',
				desc: { en: 'Use the Windows ML providers in the Windows ML build.', nl: 'Gebruik de Windows ML-providers in de Windows ML-versie.' }
			},
			{
				key: 'opset',
				type: 'integer',
				default: '20',
				limits: '> 0',
				desc: { en: 'ONNX version used when a model is converted.', nl: 'ONNX-versie die wordt gebruikt als een model wordt omgezet.' }
			}
		]
	},
	{
		id: 'health',
		path: 'health',
		title: { en: 'health — heartbeat (top level)', nl: 'health — hartslag (hoofdniveau)' },
		intro: {
			en: 'Next to <code>detectors</code>. The detector calls this address while it runs; when the calls stop, a service such as Healthchecks.io or Uptime Kuma warns you. Also set on the monitoring status page under <em>Heartbeat</em>. A failed call is only a warning in the log.',
			nl: 'Naast <code>detectors</code>. De detector roept dit adres aan zolang hij draait; stoppen de aanroepen, dan waarschuwt een dienst als Healthchecks.io of Uptime Kuma je. Ook in te stellen op de bewakingsstatuspagina onder <em>Hartslag</em>. Een mislukte aanroep is alleen een waarschuwing in het logboek.'
		},
		fields: [
			{
				key: 'url',
				type: 'string',
				required: true,
				desc: { en: 'The ping address, such as <code>https://hc-ping.com/…</code>.', nl: 'Het ping-adres, zoals <code>https://hc-ping.com/…</code>.' }
			},
			{
				key: 'interval',
				type: 'number (seconds)',
				default: '60',
				limits: '> 0',
				desc: {
					en: 'Time between two calls. Match it to the period in Healthchecks.io.',
					nl: 'Tijd tussen twee aanroepen. Stem af op de periode in Healthchecks.io.'
				}
			},
			{
				key: 'method',
				type: '"GET" | "POST" | …',
				default: '"GET"',
				desc: { en: 'The HTTP method.', nl: 'De HTTP-methode.' }
			},
			{
				key: 'timeout',
				type: 'number (seconds)',
				default: '5',
				limits: '> 0',
				desc: { en: 'How long one call may take.', nl: 'Hoe lang één aanroep mag duren.' }
			},
			{
				key: 'headers · body',
				type: 'object · string',
				default: 'null',
				desc: { en: 'Optional headers and content of the call.', nl: 'Optionele headers en inhoud van de aanroep.' }
			}
		],
		example: `"health": {
  "url": "https://hc-ping.com/1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
  "interval": 60
}`
	},
	{
		id: 'connections',
		path: 'Advanced → AI connections',
		title: { en: 'AI connections (second document under Advanced)', nl: 'AI-verbindingen (tweede document onder Geavanceerd)' },
		intro: {
			en: 'Under <em>Settings → Advanced</em> you can switch from <em>Detection</em> (the config.json above) to <em>AI connections</em>: a list of saved providers that detectors can use for the AI check. Stored in <code>app.json</code>. A connection that is in use cannot be removed.',
			nl: 'Onder <em>Instellingen → Geavanceerd</em> kun je van <em>Detection</em> (de config.json hierboven) wisselen naar <em>AI connections</em>: een lijst met opgeslagen aanbieders die detectoren kunnen gebruiken voor de AI-controle. Opgeslagen in <code>app.json</code>. Een verbinding die in gebruik is, kan niet worden verwijderd.'
		},
		fields: [
			{
				key: 'label',
				type: 'string',
				required: true,
				desc: { en: 'A unique name, such as <code>Gemini</code>.', nl: 'Een unieke naam, zoals <code>Gemini</code>.' }
			},
			{
				key: 'model',
				type: 'string | string[]',
				required: true,
				desc: { en: 'LiteLLM model name or an ordered list.', nl: 'LiteLLM-modelnaam of een lijst op volgorde.' }
			},
			{
				key: 'key',
				type: 'string | null',
				desc: { en: 'The API key.', nl: 'De API-sleutel.' }
			},
			{
				key: 'url',
				type: 'string | null',
				desc: { en: 'Provider address, http(s) only.', nl: 'Adres van de aanbieder, alleen http(s).' }
			},
			{
				key: 'headers',
				type: '{ name: value }',
				desc: { en: 'Extra request headers.', nl: 'Extra request-headers.' }
			}
		],
		example: `[
  {
    "label": "Gemini",
    "model": ["gemini/gemini-3.8-flash", "gemini/gemini-3.5-flash"],
    "key": "YOUR-GEMINI-API-KEY"
  },
  {
    "label": "Ollama on this computer",
    "model": "ollama/qwen2.5vl",
    "key": "",
    "url": "http://localhost:11434"
  }
]`
	}
];

/** Classes each model knows, for `confidence` and `cooldown` maps. */
export const modelClasses = [
	{ preset: 'Cow Catcher', file: 'cow-catcher.json', classes: ['mounting'], note: { en: 'One class, so one number is enough.', nl: 'Eén klasse, dus één getal is genoeg.' } },
	{ preset: 'Calving Catcher', file: 'calving-catcher.json', classes: ['waterbag', 'legs', 'head', 'body', 'calf'], note: { en: 'Default confidence 0.65, calf 0.85; cooldown 900 s each.', nl: 'Standaard confidence 0.65, kalf 0.85; cooldown 900 s per klasse.' } },
	{ preset: 'Calving Catcher · Low Power', file: 'calving-catcher.low-power.json', classes: ['waterbag', 'legs', 'head', 'body', 'calf'], note: { en: 'Same model; interval 5 s and frames_min 5.', nl: 'Zelfde model; interval 5 s en frames_min 5.' } },
	{ preset: 'Calving Catcher Tailup', file: 'calving-catcher-tailup.json', classes: ['tail_up'], note: { en: 'Confidence 0.7, cooldown 600 s, frames_min 24, a picture every 10 s.', nl: 'Confidence 0.7, cooldown 600 s, frames_min 24, elke 10 s een beeld.' } },
	{ preset: 'General', file: 'general.json', classes: ['person', 'car', 'dog', 'cat', 'cow', 'horse', 'sheep', '…'], note: { en: 'The 80 standard COCO classes of yolo26m.pt.', nl: 'De 80 standaard COCO-klassen van yolo26m.pt.' } }
];

/**
 * The skeleton shown at the top of the page. Each line: [indent, text, anchor?].
 * Anchors point to a field (`section-key`) or a section.
 * @type {Array<[number, string, string?]>}
 */
export const skeleton = [
	[0, '{'],
	[1, '"detectors": [', 'top-detectors'],
	[2, '{'],
	[3, '"detection": {', 'detection'],
	[4, '"source": ["rtsp://…"],', 'detection-source'],
	[4, '"interval": 1,', 'detection-interval'],
	[4, '"frame_retention": 15,', 'detection-frame_retention'],
	[4, '"frames_width": 1280,', 'detection-frames_width'],
	[4, '"areas": { "rtsp://…": [[x, y], …] }', 'detection-areas'],
	[3, '},'],
	[3, '"yolo": {', 'yolo'],
	[4, '"model": "https://…/model.pt",', 'yolo-model'],
	[4, '"confidence": { "calf": 0.85 },', 'yolo-confidence'],
	[4, '"cooldown": { "calf": 900 },', 'yolo-cooldown'],
	[4, '"frames_min": 10,', 'yolo-frames_min'],
	[4, '"timeout": 30,', 'yolo-timeout'],
	[4, '"time_max": 60,', 'yolo-time_max'],
	[4, '"include_trailing_time": 1,', 'yolo-include_trailing_time'],
	[4, '"imgsz": 640,', 'yolo-imgsz'],
	[4, '"task": "detect",', 'yolo-task'],
	[4, '"tracking": false', 'yolo-tracking'],
	[3, '},'],
	[3, '"vlm": { "key": null, "prompt": "…", "model": "…", "strategy": "VIDEO" },', 'vlm'],
	[3, '"exporters": {'],
	[4, '"disk": { "directory": "calvings", "strategy": "BEST" },', 'disk'],
	[4, '"telegram": [{ "token": "…", "chat": "…", "quiet": { … } }],', 'telegram'],
	[4, '"webhook": [{ "url": "http://…" }]', 'webhook'],
	[3, '}'],
	[2, '}'],
	[1, '],'],
	[1, '"onnx": { "provider": null, "winml": true, "opset": 20 },', 'onnx'],
	[1, '"health": { "url": "https://hc-ping.com/…", "interval": 60 }', 'health'],
	[0, '}']
];

/** Worked examples: complete snippets for common wishes. */
export const recipes = [
	{
		id: 'recipe-calf',
		title: { en: 'Keep the calf with the cow without constant alerts', nl: 'Kalf bij de koe zonder steeds meldingen' },
		text: {
			en: 'Only the <code>calf</code> lines change; the cow’s calving signs keep their defaults. A cooldown of 86400 seconds allows at most one calf alert per camera per day. See also the <a href="{base}/tutorials/calf-detection/">tutorial</a>.',
			nl: 'Alleen de <code>calf</code>-regels veranderen; de afkalfsignalen van de koe houden hun standaardwaarden. Een cooldown van 86400 seconden geeft hooguit één kalfmelding per camera per dag. Zie ook de <a href="{base}/tutorials/calf-detection/">tutorial</a>.'
		},
		code: `"confidence": { "waterbag": 0.65, "legs": 0.65, "head": 0.65, "body": 0.65, "calf": 0.85 },
"cooldown":   { "waterbag": 900,  "legs": 900,  "head": 900,  "body": 900,  "calf": 86400 }`
	},
	{
		id: 'recipe-fewer',
		title: { en: 'Fewer false heat alerts', nl: 'Minder valse tochtmeldingen' },
		text: {
			en: 'Raise the threshold a little and ask for more matching pictures. Change in small steps (0.02 at a time) and watch the result for a few days.',
			nl: 'Verhoog de drempel iets en vraag om meer overeenkomende beelden. Verander in kleine stappen (0.02 per keer) en bekijk het resultaat een paar dagen.'
		},
		code: `"yolo": {
  "model": "https://github.com/CowCatcherAI/CowCatcherAI/releases/download/model-V16/cowcatcherV17.2.pt",
  "confidence": 0.90,
  "frames_min": 5,
  "timeout": 6,
  "time_max": 50
}`
	},
	{
		id: 'recipe-night',
		title: { en: 'Two chats: the farm group quiet at night, the night shift always with sound', nl: 'Twee chats: bedrijfsgroep ’s nachts stil, nachtdienst altijd met geluid' },
		text: {
			en: 'A list under <code>telegram</code>, one object per chat. One bot can serve both.',
			nl: 'Een lijst onder <code>telegram</code>, één object per chat. Eén bot kan beide bedienen.'
		},
		code: `"telegram": [
  { "token": "123456789:AA…", "chat": "-1001111111111", "quiet": { "start": "22:00", "end": "06:00" } },
  { "token": "123456789:AA…", "chat": "-1002222222222" }
]`
	},
	{
		id: 'recipe-area',
		title: { en: 'Ignore the feed alley: watch only the cubicles', nl: 'Voergang negeren: alleen de ligboxen bekijken' },
		text: {
			en: 'Corners as fractions of the picture: <code>[0, 0]</code> is top left, <code>[1, 1]</code> bottom right. The key must be exactly the camera’s source text. Drawing it in the detector editor is easier and fills this in for you.',
			nl: 'Hoeken als fractie van het beeld: <code>[0, 0]</code> is linksboven, <code>[1, 1]</code> rechtsonder. De sleutel moet precies de brontekst van de camera zijn. Tekenen in de detector-editor is makkelijker en vult dit voor je in.'
		},
		code: `"areas": {
  "rtsp://admin:PASSWORD@192.168.1.21:554/h264Preview_01_sub": [
    [0.00, 0.35], [1.00, 0.35], [1.00, 1.00], [0.00, 1.00]
  ]
}`
	},
	{
		id: 'recipe-local-ai',
		title: { en: 'AI check with a local model (no cloud)', nl: 'AI-controle met een lokaal model (zonder cloud)' },
		text: {
			en: 'An empty key means a local service without a key. The video then never leaves the farm, but the computer needs a strong graphics card.',
			nl: 'Een lege sleutel betekent een lokale dienst zonder sleutel. De video verlaat dan nooit het bedrijf, maar de computer heeft een sterke videokaart nodig.'
		},
		code: `"vlm": {
  "key": "",
  "url": "http://localhost:11434",
  "model": "ollama/qwen2.5vl",
  "prompt": "Is one cow mounting another cow in this video?",
  "strategy": "IMAGE"
}`
	},
	{
		id: 'recipe-siren',
		title: { en: 'Switch on a siren or lamp when a calving starts', nl: 'Sirene of lamp aan bij een afkalving' },
		text: {
			en: 'A webhook with <code>GET</code> and no content can switch a smart relay (here a Shelly that turns on for 60 seconds). Put it next to <code>disk</code> and <code>telegram</code>.',
			nl: 'Een webhook met <code>GET</code> zonder inhoud kan een slim relais schakelen (hier een Shelly die 60 seconden aangaat). Zet hem naast <code>disk</code> en <code>telegram</code>.'
		},
		code: `"webhook": {
  "url": "http://192.168.1.50/relay/0?turn=on&timer=60",
  "method": "GET",
  "data_type": "none",
  "include_crop": false
}`
	}
];

/** Common mistakes when editing the JSON by hand. */
export const mistakes = [
	{
		bad: '"confidence": 0,85',
		good: '"confidence": 0.85',
		why: { en: 'Decimals use a point, never a comma.', nl: 'Decimalen met een punt, nooit met een komma.' }
	},
	{
		bad: '"frames_min": 10,\n}',
		good: '"frames_min": 10\n}',
		why: { en: 'No comma after the last item of an object or list.', nl: 'Geen komma na het laatste item van een object of lijst.' }
	},
	{
		bad: "'calf': 900",
		good: '"calf": 900',
		why: { en: 'Keys and text always use straight double quotes. Watch out for “curly” quotes from a word processor.', nl: 'Sleutels en tekst altijd met rechte dubbele aanhalingstekens. Pas op voor “krullende” aanhalingstekens uit een tekstverwerker.' }
	},
	{
		bad: '"cooldown": "900"',
		good: '"cooldown": 900',
		why: { en: 'Numbers without quotes; <code>chat</code> and <code>source</code> are text, so with quotes.', nl: 'Getallen zonder aanhalingstekens; <code>chat</code> en <code>source</code> zijn tekst, dus met aanhalingstekens.' }
	},
	{
		bad: '"Confidence": 0.85',
		good: '"confidence": 0.85',
		why: { en: 'Keys are case-sensitive and unknown keys are refused, so a typo is reported instead of silently ignored.', nl: 'Sleutels zijn hoofdlettergevoelig en onbekende sleutels worden geweigerd, dus een typfout wordt gemeld in plaats van stil genegeerd.' }
	},
	{
		bad: '"detectors": [ { "yolo": { … } } ],\n"health": { … }  ← inside a detector',
		good: '"detectors": [ … ],\n"health": { … }',
		why: { en: '<code>health</code> and <code>onnx</code> belong at the top level, next to <code>detectors</code>.', nl: '<code>health</code> en <code>onnx</code> horen op het hoofdniveau, naast <code>detectors</code>.' }
	}
];
