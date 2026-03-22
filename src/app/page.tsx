import Link from 'next/link'
import styles from './page.module.css'
import { FirmwareDropdown } from './firmware-dropdown'
import firmware from '../../public/downloads/charger/firmware.json'

const features = [
  { title: 'Open Source', desc: 'Открытая схема и прошивка на Arduino (ATmega328P, LGT8F328P)' },
  { title: 'Режимы работы', desc: 'Заряд, дозаряд, разряд, КТЦ, хранение, буферный, асимметричный заряд и режим блока питания' },
  { title: 'Восстановление АКБ', desc: 'Десульфатация, асимметричный заряд, качели — алгоритмы восстановления убитых батарей' },
  { title: 'Температурный контроль', desc: 'DS18B20 и NTC датчики, автокоррекция напряжения, управление вентилятором' },
  { title: '9 типов АКБ', desc: 'Pb Ca/Ca, AGM, GEL, Li-ion, LiFePo4, LiTit, NiCd/NiMH и другие' },
  { title: '10 профилей', desc: 'Независимые настройки для каждого аккумулятора' },
  { title: 'Защита', desc: 'Переполюсовка, КЗ, перегрев, перенапряжение, контроль 220В' },
  { title: 'Статистика', desc: 'Ач, Втч, внутреннее сопротивление, пусковой ток, время заряда' },
  { title: 'Логгер', desc: 'Запись данных на SD-карту, графики заряда в браузере по Wi-Fi в реальном времени' },
]

export default function IndexPage() {
  return (
    <div className={styles.bg}>
    <div className={styles.container}>
      <div className={styles.hero}>
        <h1 className={styles.title}>ViktoRi</h1>
        <p className={styles.subtitle}>
          Универсальное зарядное устройство с открытым исходным кодом на базе Arduino
        </p>
        <p className={styles.version}>Актуальная версия: {firmware.version}</p>
        <div className={styles.buttons}>
          <Link href="/docs" className={styles.btnPrimary}>
            Читать документацию
          </Link>
          <FirmwareDropdown
            version={firmware.version}
            file={firmware.file}
            downloads={firmware.downloads}
          />
        </div>
      </div>

      <div className={styles.grid}>
        {features.map((f) => (
          <div key={f.title} className={styles.card}>
            <h3 className={styles.cardTitle}>{f.title}</h3>
            <p className={styles.cardDesc}>{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  )
}
