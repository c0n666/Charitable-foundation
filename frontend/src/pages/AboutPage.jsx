import { Link } from 'react-router-dom'
import { 
  HiSearch, 
  HiCheckCircle, 
  HiLockClosed, 
  HiLightningBolt,
  HiHeart,
  HiHome,
  HiAcademicCap,
  HiMail,
  HiPhone,
  HiLocationMarker,
  HiUserGroup,
  HiBriefcase,
  HiHand,
  HiCash
} from 'react-icons/hi'
import Card from '../components/Card'
import Button from '../components/Button'

const AboutPage = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-8">Про нас</h1>

      {/* Hero Section */}
      <div className="mb-8 rounded-lg shadow-md p-8 bg-gradient-to-r from-primary-50 to-primary-100 dark:from-primary-700 dark:to-primary-900">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Наша місія</h2>
          <p className="text-gray-800 dark:text-gray-100 text-lg leading-relaxed max-w-3xl mx-auto">
            Благодійний фонд створений для об'єднання людей та надання допомоги тим, хто її потребує. 
            Ми прагнемо створити прозору та ефективну платформу, де кожна пожертва має значення та досягає своєї мети.
          </p>
        </div>
      </div>

      {/* Наша історія */}
      <Card className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Наша історія</h2>
        <div className="space-y-4 text-gray-600 dark:text-gray-400">
          <p className="text-lg leading-relaxed">
            Благодійний фонд було засновано у 2020 році з метою об'єднати зусилля людей для надання допомоги тим, хто її потребує. 
            За час існування ми допомогли тисячам людей та реалізували сотні благодійних проєктів.
          </p>
          <p className="text-lg leading-relaxed">
            Ми розпочали як невелика ініціатива групи волонтерів, які хотіли зробити світ кращим. 
            Сьогодні ми - це велика спільнота донорів, волонтерів та партнерів, які разом створюють позитивні зміни.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">500+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Реалізованих проєктів</div>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">10,000+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Отримали допомогу</div>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">50,000+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Активних донорів</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Наші цінності */}
      <Card className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Наші цінності</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border-l-4 border-primary-500">
            <div className="flex items-center space-x-2 mb-2">
              <HiSearch className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Прозорість</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Ми публікуємо детальні звіти про використання кожного зібраного гривня. 
              Кожен донор може відстежити, куди пішли його кошти.
            </p>
          </div>
          <div className="p-4 border-l-4 border-green-500">
            <div className="flex items-center space-x-2 mb-2">
              <HiCheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Відповідальність</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Кожна пожертва досягає своєї мети. Ми гарантуємо, що кошти використовуються 
              виключно за призначенням та досягають тих, хто потребує допомоги.
            </p>
          </div>
          <div className="p-4 border-l-4 border-blue-500">
            <div className="flex items-center space-x-2 mb-2">
              <HiLockClosed className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Довіра</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Ми забезпечуємо повну безпеку та конфіденційність даних наших донорів. 
              Ваша інформація захищена та не передається третім особам.
            </p>
          </div>
          <div className="p-4 border-l-4 border-purple-500">
            <div className="flex items-center space-x-2 mb-2">
              <HiLightningBolt className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Ефективність</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Мінімальні витрати на адміністрацію - більшість коштів йде безпосередньо на допомогу. 
              Ми прагнемо до максимальної ефективності використання ресурсів.
            </p>
          </div>
        </div>
      </Card>

      {/* Як це працює */}
      <Card className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Як це працює</h2>
        <div className="space-y-6">
          <div className="flex items-start">
            <div className="flex-shrink-0 w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center text-xl font-bold mr-4">
              1
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Реєстрація та авторизація</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Створіть обліковий запис на нашому сайті. Це займе лише кілька хвилин. 
                Після реєстрації ви зможете переглядати кампанії та робити пожертви.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center text-xl font-bold mr-4">
              2
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Вибір кампанії</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Перегляньте активні благодійні кампанії. Кожна кампанія має детальний опис, 
                фото та інформацію про цільову суму. Оберіть ту, яка вам найближча.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center text-xl font-bold mr-4">
              3
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Пожертва</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Зробіть пожертву через зручну форму. Ви можете вказати суму, залишити повідомлення 
                та оберіть, чи хочете залишитися анонімним. Всі пожертви безпечні та захищені.
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center text-xl font-bold mr-4">
              4
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">Транспарентність та звітність</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Відстежуйте прогрес кампанії в реальному часі. Ми публікуємо регулярні звіти 
                про використання коштів та результати роботи. Ви завжди знаєте, куди пішли ваші кошти.
              </p>
            </div>
          </div>
        </div>
      </Card>

      {/* Наші досягнення */}
      <Card className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Наші досягнення</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 rounded-lg">
            <div className="flex items-center space-x-2 mb-3">
              <HiHeart className="w-6 h-6 text-green-600 dark:text-green-400" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Допомога дітям</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Завдяки вашим пожертвам ми змогли допомогти тисячам дітей: надали медичну допомогу, 
              забезпечили навчання, організували літні табори та культурні заходи.
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <li>Медична допомога для 2,500+ дітей</li>
              <li>Освітні програми для 1,800+ школярів</li>
              <li>Літні табори для 500+ дітей</li>
            </ul>
          </div>
          <div className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-lg">
            <div className="flex items-center space-x-2 mb-3">
              <HiHeart className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Підтримка лікарень</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Ми закупили сучасне медичне обладнання для лікарень, що дозволило покращити 
              якість медичної допомоги та врятувати життя багатьох пацієнтів.
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <li>Обладнання для 15+ лікарень</li>
              <li>Понад 5,000 пацієнтів отримали допомогу</li>
              <li>Покращення якості обслуговування на 40%</li>
            </ul>
          </div>
          <div className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 rounded-lg">
            <div className="flex items-center space-x-2 mb-3">
              <HiHome className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Допомога сім'ям</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Ми підтримуємо сім'ї, які опинилися в складній життєвій ситуації: надаємо 
              продовольчу допомогу, допомагаємо з житлом та організовуємо соціальні програми.
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <li>Допомога 3,000+ сім'ям</li>
              <li>Продовольчі набори для 5,000+ людей</li>
              <li>Соціальні програми для 2,000+ людей</li>
            </ul>
          </div>
          <div className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 dark:from-orange-900 dark:to-orange-800 rounded-lg">
            <div className="flex items-center space-x-2 mb-3">
              <HiAcademicCap className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Освітні ініціативи</h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Ми підтримуємо освітні проєкти: надаємо стипендії, закуповуємо підручники, 
              організовуємо навчальні програми та підтримуємо талановитих студентів.
            </p>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <li>Стипендії для 800+ студентів</li>
              <li>Підручники для 2,000+ школярів</li>
              <li>Навчальні програми для 1,500+ людей</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Команда */}
      <Card className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Наша команда</h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-6">
          Наша команда складається з професіоналів, які працюють з повною віддачею та ентузіазмом. 
          Ми об'єдналися заради спільної мети - зробити світ кращим місцем.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4">
            <div className="w-24 h-24 bg-primary-200 dark:bg-primary-800 rounded-full mx-auto mb-4 flex items-center justify-center">
              <HiUserGroup className="w-12 h-12 text-primary-600 dark:text-primary-400" />
            </div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Волонтери</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Понад 200 активних волонтерів, які працюють безкоштовно заради спільної мети
            </p>
          </div>
          <div className="text-center p-4">
            <div className="w-24 h-24 bg-green-200 dark:bg-green-800 rounded-full mx-auto mb-4 flex items-center justify-center">
              <HiBriefcase className="w-12 h-12 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Співробітники</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Професійна команда з 25 співробітників, які забезпечують роботу фонду
            </p>
          </div>
          <div className="text-center p-4">
            <div className="w-24 h-24 bg-blue-200 dark:bg-blue-800 rounded-full mx-auto mb-4 flex items-center justify-center">
              <HiHand className="w-12 h-12 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">Партнери</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Понад 50 партнерських організацій та бізнесів, які підтримують наші ініціативи
            </p>
          </div>
        </div>
      </Card>

      {/* Як приєднатися */}
      <Card className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Як приєднатися</h2>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <HiCash className="w-5 h-5 text-primary-600 dark:text-primary-400" />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Стати донором</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              Зробіть пожертву на будь-яку з наших кампаній. Кожна гривня має значення!
            </p>
            <Link to="/campaigns">
              <Button variant="primary" className="mt-2">Переглянути кампанії</Button>
            </Link>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <HiHand className="w-5 h-5 text-green-600 dark:text-green-400" />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Стати волонтером</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              Приєднуйтесь до нашої команди волонтерів та допомагайте реалізовувати проєкти.
            </p>
            <Link to="/register">
              <Button variant="secondary" className="mt-2">Зареєструватися як волонтер</Button>
            </Link>
          </div>
          <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <HiBriefcase className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Стати партнером</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-3">
              Якщо ви представляєте організацію або бізнес, станьте нашим партнером.
            </p>
            <a href="mailto:partners@charityfund.ua">
              <Button variant="secondary" className="mt-2">Написати нам</Button>
            </a>
          </div>
        </div>
      </Card>

      {/* Контакти */}
      <Card>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-6">Контакти</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">Зв'яжіться з нами</h3>
            <div className="space-y-3 text-gray-600 dark:text-gray-400">
              <div className="flex items-start">
                <HiMail className="w-5 h-5 mr-3 mt-0.5 text-primary-600 dark:text-primary-400 flex-shrink-0" />
                <div>
                  <strong>Email:</strong><br />
                  <a href="mailto:info@charityfund.ua" className="text-primary-600 dark:text-primary-400 hover:underline">
                    info@charityfund.ua
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <HiPhone className="w-5 h-5 mr-3 mt-0.5 text-primary-600 dark:text-primary-400 flex-shrink-0" />
                <div>
                  <strong>Телефон:</strong><br />
                  <a href="tel:+380501234567" className="text-primary-600 dark:text-primary-400 hover:underline">
                    +380 (50) 123-45-67
                  </a>
                </div>
              </div>
              <div className="flex items-start">
                <HiLocationMarker className="w-5 h-5 mr-3 mt-0.5 text-primary-600 dark:text-primary-400 flex-shrink-0" />
                <div>
                  <strong>Адреса:</strong><br />
                  м. Київ, вул. Хрещатик, 1<br />
                  Офіс працює: Пн-Пт, 9:00-18:00
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-4">Соціальні мережі</h3>
            <div className="space-y-2 text-gray-600 dark:text-gray-400">
              <div>📱 Facebook: <span className="text-primary-600 dark:text-primary-400">@charityfund</span></div>
              <div>📷 Instagram: <span className="text-primary-600 dark:text-primary-400">@charityfund_ua</span></div>
              <div>🐦 Twitter: <span className="text-primary-600 dark:text-primary-400">@charityfund</span></div>
              <div>💼 LinkedIn: <span className="text-primary-600 dark:text-primary-400">Благодійний фонд</span></div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

export default AboutPage

