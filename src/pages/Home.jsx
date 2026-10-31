import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faBook, faClock, faBrain } from '@fortawesome/free-solid-svg-icons';


export default function Home() {
  // Այստեղ սահմանում ենք մեր բաժինների տվյալները, գույներն ու հղումները
  const menuItems = [
    {
      title: "Քննական Տոմսեր",
      description: "60 պրոֆեսիոնալ տոմս՝ յուրաքանչյուրում 20 քննական հարց",
      link: "/tickets",
      icon: "🚗",
      bgClass: "bg-blue-50 border-blue-200 hover:bg-blue-100 text-blue-600"
    },
    {
      title: "Ըստ Թեմաների",
      description: "Ուսումնասիրեք հարցերը խմբավորված՝ ըստ ճանապարհային կանոնների",
      link: "/topics",
      icon: "📚",
      bgClass: "bg-green-50 border-green-200 hover:bg-green-100 text-green-600"
    },
    {
      title: "Նախնական Քննություն",
      description: "Իրական քննության սիմուլյատոր՝ 20 պատահական հարցերով",
      link: "/exam-simulation",
      icon: "⏱️",
      bgClass: "bg-amber-50 border-amber-200 hover:bg-amber-100 text-amber-600"
    },
    {
      title: "Հոգեբանական Թեստ",
      description: "Վարորդական հոգեբանությանն ու էթիկային վերաբերող հարցաշարեր",
      link: "/psychological",
      icon: "🧠",
      bgClass: "bg-purple-50 border-purple-200 hover:bg-purple-100 text-purple-600"
    }
  ];

  return (
    <div>
        <div className='section_a'>
          <div className='section_aa'>
            {/* <img src='/src/assets/slider/2.png' /> */}
          </div>
          <div className='section_ab flex items-center'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between'>
              <p><FontAwesomeIcon icon="faArrowUpRightDots" /> Հասկանալի տեսություն</p>
              <p> Գիտակցված պրակտիկա</p>
              <p> Վստահություն ճանապարհին</p>
            </div>
          </div>
        </div>

        {/*Curses*/}
        <div className="section_curses">
          <div className=' max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='label'><p className='text-xs'>01 / Դասընթացներ</p></div>
            <div className='my-8 sec-title text-2xl font-bold'>Երկու ուղղություն։ Մեկ նպատակ։</div>
            <div className='curses-list grid grid-cols-2 space-x-4'>
              <div className='theory'>
                <p className='label text-xs'>Տեսություն</p>
                <p className='title text-xl font-semibold my-4'>Հասկացիր ճանապարհը։</p>
                <p className='content text-sm'>Երթևեկության կանոններ, նշաններ և իրավիճակներ՝ գիտակցված որոշումների համար</p>
              </div>
              <div className='practice'>
                <p className='label text-xs'>Պրակտիկա</p>
                <p className='title text-xl font-semibold text-white my-4'>Զգա ղեկը։</p>
                <p className='content text-sm text-white'>Մեքենայի կառավարումից մինչև քաղաքային երթևեկություն՝ քայլ առ քայլ։</p>
              </div>
            </div>
          </div>
        </div>
        {/*End Curses*/}
        {/*Theory */}
        <div className="section_theory">
          <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
            <div className='label'><p className='text-xs'>02 / Տեսություն</p></div>
            <div className='curses-list grid grid-cols-2 space-x-4'>
              <div className='theory'>
                <p className='title text-xl font-semibold my-4'>Կանոններ՝ հասկանալի</p>
                <p className='content text-sm'>Սովորիր տեսնել կանոնների իմաստը և կիրառել այն իրական ճանապարհային իրավիճակներում։</p>
              </div>
              <div className='practice'>
                <div></div>
              </div>
            </div>
          </div>
        </div>
        {/*End theory */}

        <footer>
          
        </footer>
    </div>
  );
}
