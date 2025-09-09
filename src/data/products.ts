
export type Category = "mouse" | "keyboard" | "mousepad" | "headset" | "iem" | "accessory" | "monitor"

export const CATEGORY_LABELS: Record<Category, string> = {
  mouse: "เมาส์",
  keyboard: "คีย์บอร์ด",
  mousepad: "แผ่นรองเมาส์",
  headset: "หูฟังเกมมิ่ง",
  iem: "IEM",
  accessory: "อุปกรณ์เสริม",
  monitor: "จอ",
}

export type Product = {
  id: number
  slug: string
  name: string
  brand: string
  category: Category
  priceTHB: number
  description: string
  specs: string[]
  image: string
  images?: string[]

  video?: {
    src: string       
    poster?: string    
    type?: "youtube" | "video/mp4"     
    label?: string    
  }

  inStock: boolean
  tags?: string[]

  warrantyMonths?: number
  warrantyText?: string
}

export const DEFAULT_WARRANTY_MONTHS = 24
export const warrantyLabel = (m?: number) => {
  const months = m ?? DEFAULT_WARRANTY_MONTHS
  return months % 12 === 0 ? `${months / 12} ปี` : `${months} เดือน`
}

export const products: Product[] = [
  {
    id: 1,
    slug: "logitech-g-pro-x-superlight-2",
    name: "Logitech G PRO X Superlight 2",
    brand: "Logitech G",
    category: "mouse",
    priceTHB: 6190,
    description: "Logitech G PRO X SUPERLIGHT 2 คือเมาส์เกมมิ่งไร้สายระดับโปรที่ออกแบบร่วมกับนักกีฬาอีสปอร์ตชั้นนำ มีน้ำหนักเพียง 60 กรัม พร้อมเซ็นเซอร์ HERO 2 ความละเอียดสูงถึง 44,000 DPI และความเร็ว 888 IPS รองรับการส่งข้อมูลสูงสุด 8,000 Hz ด้วยเทคโนโลยี LIGHTSPEED และสวิตช์ LIGHTFORCE ที่ผสานความไวแบบออปติคัลกับสัมผัสเชิงกลอย่างลงตัว มั่นใจได้ในความแม่นยำและความเร็วระดับการแข่งขัน",
    specs: ["น้ำหนัก : 60 กรัม", 
      "เซ็นเซอร์ : HERO 2 ", 
      "การเชื่อมต่อ : Lightspeed Wireless", 
      "ฟีท : PTFE บริสุทธิ์ ",
      "แบตเตอรี่ : ใช้งานได้ถึง 95 ชั้วโมง",
      "อุปกรณ์การเชื่อมต่อ : อแดปเตอร์ lightspeed 2.4 Ghz",
      "อุปการเสริม : Usb C cable | ฟีทสำรอง | กริปกันลื่น "
    ],
    image: "/products/logitech-g-pro-x-superlight-2_1.png",
    images: ["/products/logitech-g-pro-x-superlight-2_2.png"],
    video: {
      src: "https://pub-fbf88aa38f454312b60f8d2953a51e84.r2.dev/logitech-gpro-2.mp4",
      poster: "/videos/logitech-gpro-2-poster.jpg",
      type: "video/mp4",
      label: "Video"
    },
    inStock: true,
    tags: ["esports", "lightweight"]
  },
  {
    id: 2,
    slug: "razer-viper-v3-pro",
    name: "Razer Viper V3 Pro",
    brand: "Razer",
    category: "mouse",
    priceTHB: 6990,
    description: "เมาส์เกมมิ่งไร้สายรุ่นใหม่ล่าสุดจาก Razer ที่ถูกออกแบบมาเพื่อการแข่งขัน Esports โดยเฉพาะ น้ำหนักเบาเพียง 54 กรัม ให้ความคล่องตัวสูง รองรับ Polling Rate สูงสุด 8000 Hz (มาพร้อม HyperPolling Wireless Dongle) และใช้เซ็นเซอร์ Razer Focus Pro 35K Gen-2 ที่แม่นยำที่สุดของ Razerเมาส์รุ่นนี้ถูกใช้งานจริงโดยโปรเพลเยอร์ระดับโลกในหลายเวทีแข่งขัน และได้รับการยอมรับในฐานะเมาส์ที่รวม ความเบา ความเร็ว และความแม่นยำ ไว้อย่างลงตัว จนได้รับความนิยมอย่างรวดเร็วในตลาดเกมเมอร์สายแข่งขัน",
    specs: ["น้ำหนัก : 70 กรัม", 
      "เซ็นเซอร์ Focus Pro 35K Optical Sensor Gen-2", 
      "การเชื่อมต่อ : HyperSpeed Wireless", 
      "ฟีท : PTFE บริสุทธิ์ ",
      "แบตเตอรี่ :95ชม.ที่1000hz | 62ชม.ที่2000hz | 40ชม.ที่4000hz | 17ชม.ที่8000hz",
      "อุปกรณ์การเชื่อมต่อ : อแดปเตอร์ 2.4 Ghz",
      "อุปการเสริม : Usb C cable และ หัวแปลง Type A  | ฟีทสำรอง | กริปกันลื่น"
    ],
    image: "/products/Razer Viper V3 Pro.png",
    images: ["/products/Razer Viper V3 Pro2.png"],
    video: {
      src: "https://pub-fbf88aa38f454312b60f8d2953a51e84.r2.dev/razer-viper-v3-pro.mp4",
      poster: "/videos/razer-viper-v3-pro-poster.jpg",
      type: "video/mp4",
      label: "Video"
    },
    inStock: true,
    tags: ["esports", "tournament"]
  },
  {
    id: 3,
    slug: "hitscan-hyperlight",
    name: "Hitscan Hyperlight",
    brand: "Hitscan",
    category: "mouse",
    priceTHB: 3790,
    description: "เมาส์ HITSCAN Hyperlight เป็นรุ่นแรกและรุ่นล่าสุดของแบรนด์ HITSCAN จากสหรัฐอเมริกา เคยถูกพูดถึงใน Reddit (r/MouseReview) เมื่อ 6 เดือนก่อน และได้รับความสนใจจากผู้ใช้ทั่วโลก แบรนด์นี้เน้นการพัฒนาด้วยความใส่ใจ ตั้งแต่กล่องบรรจุภัณฑ์จนถึงตัวเมาส์ ทุกดีไซน์ถูกคิดมาอย่างพิถีพิถัน ในสไตล์ของคนรักเมาส์ที่ได้ออกแบบเอง เพื่อให้ผู้ใช้ทุกคนสัมผัสได้ถึงคุณภาพและความพิเศษของ HITSCAN",
    specs: [
      "น้ำหนัก : 39 กรัม",
      "เซ็นเซอร์ : Pixart 3950",
      "การเชื่อมต่อ : ไร้สายและแบบใช้สาย",
      "ฟีท : PTFE บริสุทธิ์ ",
      "แบตเตอรี่ : 80ชม.ที่1000hz | 60ชม.ที่2000hz | 40ชม.ที่4000hz | 17ชม.ที่8000hz",
      "อุปกรณ์การเชื่อมต่อ : อแดปเตอร์ 2.4 Ghz",
      "อุปการเสริม : Usb C cable | ฟีทสำรอง | กริปกันลื่น "
      
    ],
    image: "/products/Hitscan Hyperlight.png",
    images: ["/products/Hitscan Hyperlight1.png"],
    video: {
      src: "https://pub-fbf88aa38f454312b60f8d2953a51e84.r2.dev/hitscan-hyperlight.mp4",
      poster: "/videos/hitscan-hyperlight-poster.jpg",
      type: "video/mp4"
    },
    inStock: true
  },
  {
    id: 4,
    slug: "ninjutso-sora-v2",
    name: "Ninjutso Sora V2",
    brand: "Ninjutso",
    category: "mouse",
    priceTHB: 3490,
    description: "Ninjutso Sora V2 เมาส์รุ่นใหม่ล่าสุดที่พัฒนาต่อยอดจาก Sora 4K ทำให้น้ำหนักเบาลงเหลือเพียง 39 กรัม และปรับทรงเพื่อการจับที่คล่องตัวขึ้น รองรับ Polling Rate สูงสุด 8000 Hz (ต้องซื้อ 8K Dongle แยกต่างหาก)เมาส์รุ่นนี้ถูกใช้โดย TenZ โปรเพลเยอร์ทีม Sentinels ในการแข่งขัน VCT 2024: Masters Madrid และคว้าแชมป์ จนได้รับความนิยมสูงเกินกว่ายอดผลิต ทำให้สินค้าขาดตลาดอยู่ช่วงหนึ่ง",
    specs: [
      "น้ำหนัก : 39 กรัม",
      "เซ็นเซอร์ : Pixart 3950",
      "การเชื่อมต่อ : ไร้สายและแบบใช้สาย", 
      "ฟีท : PTFE บริสุทธิ์ ",
      "แบตเตอรี่ : 80ชม.ที่1000hz | 60ชม.ที่2000hz | 40ชม.ที่4000hz",
      "อุปกรณ์การเชื่อมต่อ : อแดปเตอร์ 2.4 Ghz",
      "อุปการเสริม : Usb C cable | ฟีทสำรอง | กริปกันลื่น ",
    ],
    image: "/products/Ninja Sora V2.png",
    images: ["/products/Ninja Sora V21.png"],
    video: {
      src: "https://pub-fbf88aa38f454312b60f8d2953a51e84.r2.dev/ninjutso-sora-v2.mp4",
      poster: "/videos/ninjutso-sora-v2-poster.jpg",
      type: "video/mp4"
    },
    inStock: true
  },
  {
    id: 5,
    slug: "ying-75he",
    name: "Ying 75HE",
    brand: "WLmouse",
    category: "keyboard",
    priceTHB: 8490,
    description:
      "คีย์บอร์ด Forged Carbon ตัวแรกของโลก ผลิตด้วยกระบวนการเฉพาะที่ผ่านการทดสอบนับพันครั้ง แข็งแรงระดับอากาศยานและทนทานยาวนาน \nวัสดุพรีเมียม – ผิวสัมผัสเรียบ ละมุน มีลวดลายธรรมชาติที่เปลี่ยนแสงได้ เหมือนงานศิลป์ \nPCB Nano-Hydrophobic Coating – กันน้ำ กันความชื้น ป้องกันการออกซิเดชัน ยืดอายุการใช้งาน \nRT 0.005mm – ความแม่นยำสูงสุด เหนือกว่ามาตรฐาน 0.01mm ให้ประสิทธิภาพสูงสุด" ,
    specs: [
      "ขนาด : 75% (84 คีย์)",
      "วัสดุ : คาร์บอนฟอร์จ", 
      "เพลท : อลุมิเนียม",
      "ประเภทสวิตซ์ : แม่เหล็ก", 
      "ความแม่นยำการกด :  0.005 มม.",
      "อัตตราการตรวจสอบ : Full-Key 32K",
      "ความถี่ : 125-8000Hz (ปรับแต่งได้), 0.125s ความถี่ต่ำ",
      "การเชื่อมต่อ : แบบใช้สาย",
    ],
    image: "/products/Ying 75HE.png",
    images: ["/products/Ying 75HE1.png"],
     video: {
      src: "https://pub-fbf88aa38f454312b60f8d2953a51e84.r2.dev/ying-75he.mp4",
      poster: "/videos/ying-75he-poster.jpg",
      type: "video/mp4"
    },
    inStock: true
  },
  {
    id: 6,
    slug: "monsgeek-fun60-ultra-tmr-61",
    name: "MonsGeek FUN60 Ultra TMR 61",
    brand: "MonsGeek",
    category: "keyboard",
    priceTHB: 2450,
    description: "คีย์บอร์ดอะลูมิเนียมรุ่นใหม่ที่ปฏิวัติวงการเกมมิ่ง มาพร้อมสวิตช์แม่เหล็ก TMR Magnetic Switch ที่ทั้งเร็วและแม่นยำ \nจุดเด่น: \n รองรับ Magnetic Switch หลายแบรนด์ \n Hot-swap ได้กับสวิตช์ Mechanical แบบ 5-Pin (TMR Version) \n ความแม่นยำสูงสุด RT 0.01mm สำหรับการเล่นเกม \n เทคโนโลยี MagMech ใช้ได้ทั้ง Magnetic และ Mechanical Switch",
    specs: [
      "ขนาด : 60% ",
      "วัสดุ : อลูมิเนียม", 
      "เพลท : อลุมิเนียม",
      "ประเภทสวิตซ์ : แม่เหล็กและแมคคานิคอล", 
      "ความแม่นยำการกด :  0.001 มม.",
      "อัตตราการตรวจสอบ : Full-Key 120K",
      "ความถี่ : 125-8000Hz (ปรับแต่งได้), 0.01s ความถี่ต่ำ",
      "การเชื่อมต่อ : แบบใช้สายและไร้สาย",
    ],
    image: "/products/FUN60 Ultra.png",
    images: ["/products/FUN60 Ultra1.png"],
    video: {
      src: "https://pub-fbf88aa38f454312b60f8d2953a51e84.r2.dev/fun60-ultra.mp4",
      poster: "/videos/fun60-ultra-poster.jpg",
      type: "video/mp4"
    },
    inStock: true
  },
  {
    id: 7,
    slug: "artisan-zero-xsoft-xl",
    name: "Artisan Zero XSoft XL",
    brand: "Artisan",
    category: "mousepad",
    priceTHB: 1890,
    description: "แผ่นรองเมาส์ระดับตำนานจากญี่ปุ่น รุ่น Zero XSoft ขนาด XL สำหรับเกมเมอร์ \nที่ต้องการความแม่นยำและคุมเมาส์ได้ลื่นไหลที่สุด",
    specs: [
      "ขนาด : XL", 
      "วัสดุ : ผ้า",
      "ความนุ่ม : นุ่มพิเศษ", 
      "ประเภท : คอนโทรล", 
      "ขอบ : เย็บขอบ",
      "ผลิตใน : ญีปุ่น"
    ],
    image: "/products/artisan-zero-xsoft-xl.jpg",
    video: {
      src: "https://pub-fbf88aa38f454312b60f8d2953a51e84.r2.dev/artisan-zero-xsoft-xl.mp4",
      poster: "/videos/artisan-zero-xsoft-xl-poster.jpg",
      type: "video/mp4"
    },
    inStock: true
  },
  {
    id: 8,
    slug: "yuki-aim-demon1",
    name: "Yuki Aim x Demon1 ",
    brand: "Yuki Aim",
    category: "mousepad",
    priceTHB: 1690,
    description: "แผ่นรองเมาส์ที่ออกแบบร่วมกับ Max “Demon1” Mazanov อดีตโปรเพลเยอร์ทีม Evil Geniuses ",
    specs: [
      "ขนาด : XL", 
      "วัสดุ : ผ้า",
      "ความนุ่ม : นุ่ม",
      "ประเภท : คอนโทรล", 
      "ขอบ : เย็บขอบ",
      "ผลิตใน : ไต้หวัน",
    ],
    image: "/products/Yuki Aim Demon.png",
    images: ["/products/Yuki Aim Demon1.png"],
    inStock: true
  },
  {
    id: 9,
    slug: "yuki-aim-og-limited",
    name: "Yuki Aim OG Limited",
    brand: "Yuki Aim",
    category: "mousepad",
    priceTHB: 1690,
    description: "Yuki Aim OG Limited — แผ่นรองเมาส์ลิมิเต็ดเอดิชัน ดีไซน์โดย Yuki Aim ผลิตในไต้หวัน ขนาดกำลังดี 450×400 มม. พื้นผิว Smooth Control ให้การควบคุมแม่นยำ และฐานยางธรรมชาติยึดโต๊ะแน่น — สไตล์ Esports ที่เรียบเท่แต่คลาสสิก",
    specs: [
      "ขนาด : XL", 
      "วัสดุ : ผ้า", 
      "ความนุ่ม : นุ่ม",
      "ประเภท : คอนโทรล",
      "ขอบ : เย็บขอบ",
      "ผลิตใน : ไต้หวัน",
      ],
    image: "/products/Yuki Aim - OG Limited (Black).png",
    inStock: true
    
  },
  {
    id: 10,
     slug: "yuki-aim-oni-20-glass-mousepad-limited",
    name: "Yuki Aim - Oni 2.0 - Glass Mousepad Limited",
    brand: "Yuki Aim",
    category: "mousepad",
    priceTHB: 4590,
    description: "Yuki Aim – Oni 2.0 – Glass Mousepad (Limited Edition)แผ่นรองเมาส์แก้วรุ่นพิเศษ ขนาด 500 × 400 มม. ผสานความบางระดับไฮเอนด์ 2 มม. \nกับการเทมเปอร์อย่างพิถีพิถัน ให้พื้นผิวลื่นไหลระดับโปร พร้อมฐานซิลิโคนดีไซน์เฉพาะตัวจาก Yuki ที่มั่นคงสุด ๆ \nออกแบบโดย Yuki Aim และ @tofumang_ \nผลงานลิมิเต็ดที่จับต้องได้กว่าแค่งานศิลป์“Touch art, glide performance.”",
    specs: [
      "ขนาด : XL", 
      "วัสดุ : กระจก",
      "ประเภท : สปีด",
      "ขอบ : ขอบโค้งมน",
      "ผลิตใน : ไต้หวัน",
      ],
    image: "/products/Yuki Aim oni.png",
    images: ["/products/Yuki Aim oni1.png"],
    inStock: true
    
  },
  {
    id: 11,
    slug: "razer-blackshark-v2",
    name: "Razer BlackShark V2",
    brand: "Razer",
    category: "headset",
    priceTHB: 3490,
    description: "Razer BlackShark V2 – Esports Headset ระดับตำนาน \nหูฟังที่ออกแบบมาเพื่อ เกมเมอร์สายแข่งขัน โดยเฉพาะ โดดเด่นด้วยเสียงที่แม่นยำ การสวมใส่สบาย และไมโครโฟนที่คมชัด ให้คุณได้เปรียบทุกจังหวะในสนามแข่ง",
    specs: [
      "ไดร์เวอร์ : TriForce 50mm ",
      "ระบบจำลอง : THX Spatial Audio (7.1)", 
      "ไมค์ : Razer HyperClear Cardioid Mic",
      "ความถี่ : 7 Hz – 46 kHz",
      "วัสดุครอบหู : เมมโมรี่โฟม",
      "ความยาวสาย : 1.5 เมคร",
      "การเชื่อมค่อ : 3.5 มม. และ อแดปเตอร์ซาวการ์ด Type A",
      "น้ำหนัก : 262 กรัม",
    ],
    image: "/products/razer-blackshark-v2.png",
    images: ["/products/razer-blackshark-v21.png"],
    video: {
      src: "https://pub-fbf88aa38f454312b60f8d2953a51e84.r2.dev/razer-blackshark-v2.mp4",
      poster: "/videos/razer-blackshark-v2-poster.jpg",
      type: "video/mp4"
    },
    inStock: true
    
   
  },
  {
    id: 12,
    slug: "hyperx-cloud-iii",
    name: "HyperX Cloud III",
    brand: "HyperX",
    category: "headset",
    priceTHB: 2490,
    description: "สัมผัสเสียงระดับโปรด้วย ไดร์เวอร์ angled 53 mm, รองรับ DTS Spatial Audio \nให้ตำแหน่งเสียงชัดแม่นทุกจังหวะไมโครโฟนคุณภาพสูงตัดเสียงรบกวนชัดเจน, \nพร้อมไฟ LED บ่งสถานะ Muteโครงสร้างอลูมิเนียมแข็งแรง, \nเบาสบาย — เล่นเกมยาวได้โดยไม่ปวดหัวใช้งานง่ายกับ ทุกแพลตฟอร์ม \nผ่านสาย 3.5 มม. หรือ USB adapterคุณภาพ mic และความสบายถูกยกให้เป็นหัวใจของ Cloud III",
    specs: [
      "ไดร์เวอร์ : 40 มม.", 
      "ไมค์ : สามารถถอดออกได้ ระบบรับเสียง คาร์ดิออย",
      "ความถี่ : 7 Hz – 46 kHz",
      "วัสดุครอบหู : เมมโมรี่โฟม",
      "ความยาวสาย : 1.5 เมคร",
      "การเชื่อมค่อ : 3.5 มม. และ อแดปเตอร์ซาวการ์ด Type A",
      "น้ำหนัก : 309 กรัม",
    ],
    image: "/products/hyperx-cloud-iii.png",
    images: ["/products/hyperx-cloud-iii3.png"],
    video: {
      src: "https://pub-fbf88aa38f454312b60f8d2953a51e84.r2.dev/hyperx-cloud-iii.mp4",
      poster: "/videos/hyperx-cloud-iii-poster.jpg",
      type: "video/mp4"
    },
    inStock: true
    
  },
  {
    id: 13,
    slug: "final-audio-e500",
    name: "Final Audio E500",
    brand: "Final",
    category: "iem",
    priceTHB: 990,
    description: "สัมผัสความมหัศจรรย์ของ Final Audio E500 — หูฟังอินเอียร์รุ่นระดับตำนาน เล็กกระทัดรัด น้ำหนักเบาเพียง 15 กรัม ใช้งานได้นานโดยไม่ล้า",
    specs: [
      "ไดร์เวอร์ : ไดนามิค 6.4 มม.", 
      "ความไว :  98 เดชิเบล",
      "ความถี่ : 7 Hz – 46 kHz",
      "ความต้านทาน :  16 Ω",
      "ความยาวสาย : 1.2 เมคร",
      "การเชื่อมค่อ : 3.5 มม.",
      "น้ำหนัก : 15 กรัม",
    ],
    image: "/products/Final Audio E500.png",
    images: ["/products/Final Audio E5001.png"],
    video: {
      src: "https://pub-fbf88aa38f454312b60f8d2953a51e84.r2.dev/final-audio-e500.mp4",
      poster: "/videos/final-audio-e500-poster.jpg",
      type: "video/mp4"
    },
    inStock: true
  
  },
  {
    id: 14,
    slug: "moondrop-psyche",
    name: "Moondrop psyche",
    brand: "Moondrop",
    category: "iem",
    priceTHB: 79990,
    description: "Moondrop Psyche คือผลงานหูฟังอินเอียร์ระดับเทพ ที่ผสานความล้ำหน้าเชิงเสียงกับงานดีไซน์สุดประณีต มาพร้อมระบบไดรเวอร์ 10 ตัว (2 DD + 4 BA + 4 Planar) ที่มอบเสียงเบสทรงพลัง รายละเอียดย่านเสียงกลางอย่างเที่ยงตรง และเสียงสูงที่ละเอียดเนียนไร้ความเพี้ยน",
    specs: [
      "ไดร์เวอร์ : ไดนามิค H.O.D.D.D.U.S. (ระบบไดรเวอร์ไดนามิกคู่ที่วางตรงข้ามกันในแนวนอน) | 4 × ไดรเวอร์อาร์มาเจอร์แบบสมดุล 4 ตัว",  
      "ความถี่ : 7 Hz – 46 kHz",
      "ความต้านทาน :  7 Ω",
      "การเชื่อมค่อ : 2-pin connector | 4.4 มม. แบบบาลานซ์ | หัวแปลง 3.5 มม.",
      "น้ำหนัก : 5.5 กรัม ต่อ ข้าง",
    ],
    image: "/products/moondrop-psyche.png",
    video: {
      src: "https://pub-fbf88aa38f454312b60f8d2953a51e84.r2.dev/moondrop-psyche.mp4",
      poster: "/videos/moondrop-psyche-poster.jpg",
      type: "video/mp4"
    },
    inStock: true

  },
  {
    id: 16,
    slug: "zowie-xl2411k-144hz",
    name: "ZOWIE XL2411K TN DyAc™ 144Hz",
    brand: "ZowieByBenq",
    category: "monitor",
    priceTHB: 7890,
    description: "จอเกมรุ่น XL2411K เป็นอีกรุ่นหนึ่งที่พัฒนาขึ้นมาจาก XL2411P โดยผู้เชี่ยวชาญเกม FPS ที่เน้นการสร้างประสบการณ์ที่ดีให้กับผู้เล่นเป็นหลัก XL2411K เป็นจอเกม 144Hz ขนาด 24” รุ่นล่าสุดของ ZOWIE ที่ไม่เพียงแต่เปลี่ยนดีไซน์แต่ยังเน้นความเสถียรในการใช้งาน มาพร้อมเทคโนโลยี DyAc, S-Switch, และ SHIELD",
    specs: [
      "ความละเอียด : 1920 x 1080 at 144z (DP 1.4)", 
      "อัตราการรีเฟรช : 144Hz", 
      "ประเภทหน้าจอ : TN",
      "เทคโนโลยี : Dyac", 
      "การเชื่อมต่อ : HDMI 2.0 x3 | DP 1.4  | headphone jack",
      "พลังงาน : Built-in 100-240V"
    ],
    image: "/products/Zowie144.png",
    images: ["/products/Zowie1441.png"],
    video: {
      src: "https://pub-fbf88aa38f454312b60f8d2953a51e84.r2.dev/zowie-xl2411k-144hz.mp4",
      poster: "/videos/zowie-xl2411k-144hz-poster.jpg",
      type: "video/mp4"
    },
    inStock: true
  },
  {
    id: 17,
    slug: "zowie-xl2546x-plus-280hz",
    name: "ZOWIE XL2546X+ Fast TN DyAc™ 2 280Hz Esports",
    brand: "ZowieByBenq",
    category: "monitor",
    priceTHB: 14900,
    description: " ซีรีส์ ZOWIE XL-X+ ที่มาพร้อมกับแผง Fast TN และเทคโนโลยี DyAc2 ช่วยลดภาพเบลอจากการเคลื่อนไหวได้อย่างมีประสิทธิภาพ ทำให้คุณได้รับภาพที่ชัดเจนและคมชัดยิ่งขึ้น สัมผัสความแตกต่างและยกระดับการเล่นเกมของคุณ!",
    specs: [
      "ความละเอียด : 1920 x 1080 at 280Hz (DP 1.4)", 
      "อัตราการรีเฟรช : 280Hz", 
      "ประเภทหน้าจอ : Fast TN",
      "เทคโนโลยี : Dyac2", 
      "การเชื่อมต่อ : HDMI 2.0 x3 / DP 1.4 / headphone jack",
      "พลังงาน : Built-in 100-240V"
    ],
    image: "/products/Zowie280.png",
    images: ["/products/Zowie2801.png"],
    video: {
      src: "https://pub-fbf88aa38f454312b60f8d2953a51e84.r2.dev/zowie-xl2546x-plus-280hz.mp4",
      poster: "/videos/zowie-xl2546x-plus-280hz-poster.jpg",
      type: "video/mp4"
    },
    inStock: true
  },
  {
    id: 18,
    slug: "zowie-xl2566x-plus-400hz",
    name: "ZOWIE XL2566X+ New Fast TN DyAc™ 400Hz Esports",
    brand: "ZowieByBenq",
    category: "monitor",
    priceTHB: 25000,
    description: "XL2566X+ ได้รับการออกแบบใหม่ด้วยความพิถีพิถันเพื่อเพิ่มประสิทธิภาพด้านสี ให้เฉดสีที่สดใสยิ่งขึ้นและชัดเจนยิ่งขึ้นในการเห็นศัตรู",
    specs: [
      "ความละเอียด : 1920 x 1080 at 400Hz (DP 1.4)", 
      "อัตราการรีเฟรช : 400Hz", 
      "ประเภทหน้าจอ : Fast TN",
      "เทคโนโลยี : Dyac2", 
      "การเชื่อมต่อ : HDMI 2.0 x3 / DP 1.4 / headphone jack",
      "พลังงาน : Built-in 100-240V"
    ],
    image: "/products/Zowie400.png",
    images: ["/products/Zowie4001.png"],
    video: {
      src: "https://pub-fbf88aa38f454312b60f8d2953a51e84.r2.dev/zowie-xl2566x-400hz.mp4",
      poster: "/videos/zowie-xl2566x-400hz-poster.jpg",
      type: "video/mp4"
    },
    inStock: true
  },
    {
    id: 19,
    slug: "Jade air dot",
    name: "Jade air dot",
    brand: "X-raypad",
    category: "accessory",
    priceTHB: 390,
    description: "จากผู้สร้างแผ่นรองเมาส์ในตำนาน Aqua Control ที่ขึ้นชื่อเรื่องคุณภาพเกินราคาและอายุการใช้งานยาวนาน \nวันนี้ X-raypad ก้าวไปอีกขั้นด้วยการเปิดตัวสินค้าใหม่ที่เป็นหัวใจของการใช้งานคู่กับเมาส์และแผ่นรองเมาส์อย่างแท้จริง: Mouse Feet รุ่น Obsidian และ Jade",
    specs: [
      "วัสดุ : PTFE บริสุทธิ์ ", 
      "ผลิตใน : ฮ่องกง",

    ],
    image: "/products/Jade air dot.png",
    video: {
      src: "https://pub-fbf88aa38f454312b60f8d2953a51e84.r2.dev/Jade%20air%20dot.mp4",
      poster: "/videos/Jade air dot-poster.jpg",
      type: "video/mp4"
    },
    inStock: true
  },
  {
    id: 20,
    slug: "ObsidianCrtl",
    name: "Obsidian Control dot",
    brand: "X-raypad",
    category: "accessory",
    priceTHB: 390,
    description: "จากผู้สร้างแผ่นรองเมาส์ในตำนาน Aqua Control ที่ขึ้นชื่อเรื่องคุณภาพเกินราคาและอายุการใช้งานยาวนาน \nวันนี้ X-raypad ก้าวไปอีกขั้นด้วยการเปิดตัวสินค้าใหม่ที่เป็นหัวใจของการใช้งานคู่กับเมาส์และแผ่นรองเมาส์อย่างแท้จริง: Mouse Feet รุ่น Obsidian และ Jade",
     specs: [
      "วัสดุ : PTFE บริสุทธิ์ ", 
      "ผลิตใน : ฮ่องกง",
    ],
    image: "/products/Obsidian Control dot.png",
    video: {
      src: "https://pub-fbf88aa38f454312b60f8d2953a51e84.r2.dev/Obsidian%20Control.mp4",
      poster: "/videos/Obsidian Control-poster.jpg",
      type: "youtube"
    },
    inStock: true
  },
]

export const ALL_CATEGORIES = Array.from(new Set(products.map(p => p.category)))
export const ALL_BRANDS = Array.from(new Set(products.map(p => p.brand))).sort((a,b)=>a.localeCompare(b))

export function findProduct(idOrSlug?: string) {
  if (!idOrSlug) return undefined
  const asNum = Number(idOrSlug)
  return Number.isFinite(asNum)
    ? products.find(p => p.id === asNum)
    : products.find(p => p.slug === idOrSlug)
}

export const formatTHB = (n: number) =>
  n.toLocaleString("th-TH", { style: "currency", currency: "THB", maximumFractionDigits: 0 })
