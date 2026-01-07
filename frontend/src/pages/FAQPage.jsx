import { useState } from 'react'
import Card from '../components/Card'

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      category: 'Загальні питання',
      questions: [
        {
          q: 'Як працює благодійний фонд?',
          a: 'Наш фонд збирає кошти від донорів та розподіляє їх між різними благодійними кампаніями. Кожна кампанія має конкретну мету та цільову суму. Ви можете обрати кампанію та зробити пожертву.',
        },
        {
          q: 'Чи безпечно робити донати через ваш сайт?',
          a: 'Так, наш сайт використовує сучасні технології захисту даних. Всі платежі обробляються через надійні платіжні системи. Ваші особисті дані захищені та не передаються третім особам.',
        },
        {
          q: 'Чи можу я зробити анонімний донат?',
          a: 'Так, при заповненні форми донату ви можете обрати опцію "Пожертвувати анонімно". У такому випадку ваше ім\'я не буде відображатися в публічних списках.',
        },
      ],
    },
    {
      category: 'Про донати',
      questions: [
        {
          q: 'Які способи оплати доступні?',
          a: 'Ми приймаємо платежі через банківські картки (Visa, Mastercard), а також через електронні гаманці. Всі платежі обробляються безпечно через платіжні системи.',
        },
        {
          q: 'Чи можу я зробити регулярний донат?',
          a: 'Так, ви можете налаштувати регулярні донати (щомісяця, щокварталу або щороку). Це дозволить вам автоматично підтримувати кампанії без необхідності робити донат кожного разу вручну.',
        },
        {
          q: 'Чи отримаю я податковий чек?',
          a: 'Так, після кожного донату ви отримаєте офіційний податковий чек на email. Ви можете скачати його з особистого кабінету.',
        },
        {
          q: 'Чи можу я скасувати донат?',
          a: 'Одноразові донати не можна скасувати. Однак ви можете скасувати регулярну підписку на донати в будь-який час з особистого кабінету.',
        },
      ],
    },
    {
      category: 'Про кампанії',
      questions: [
        {
          q: 'Як вибираються кампанії?',
          a: 'Всі кампанії проходять ретельну перевірку нашою командою. Ми прагнемо підтримувати лише реальні та перевірені проєкти, які мають конкретну мету та план використання коштів.',
        },
        {
          q: 'Що стається, якщо кампанія не збирає повну суму?',
          a: 'Кошти все одно використовуються за призначенням. Якщо кампанія не збирає повну суму, ми використовуємо зібрані кошти максимально ефективно для досягнення мети кампанії.',
        },
        {
          q: 'Чи можу я відстежити прогрес кампанії?',
          a: 'Так, на сторінці кожної кампанії ви можете бачити поточний прогрес, скільки зібрано коштів та скільки залишилося до мети. Також ви можете підписатися на оновлення кампанії.',
        },
      ],
    },
    {
      category: 'Звітність',
      questions: [
        {
          q: 'Як я можу перевірити, куди пішли мої кошти?',
          a: 'Ми публікуємо детальні фінансові звіти на сторінці "Звіти". Там ви можете побачити всі витрати, категорії витрат та відсоток адміністративних витрат.',
        },
        {
          q: 'Який відсоток коштів йде на адміністративні витрати?',
          a: 'Ми прагнемо мінімізувати адміністративні витрати. Зазвичай вони становлять менше 10% від загальної суми зібраних коштів. Точний відсоток завжди вказаний у фінансових звітах.',
        },
        {
          q: 'Чи публікуєте ви звіти про використання коштів?',
          a: 'Так, ми регулярно публікуємо детальні звіти про використання коштів. Ви можете переглянути їх на сторінці "Звіти" або підписатися на email-розсилку звітів.',
        },
      ],
    },
  ]

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200 mb-8">
        Часті питання (FAQ)
      </h1>

      <div className="space-y-6">
        {faqs.map((category, categoryIndex) => (
          <Card key={categoryIndex}>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
              {category.category}
            </h2>
            <div className="space-y-3">
              {category.questions.map((faq, index) => {
                const globalIndex = categoryIndex * 100 + index
                const isOpen = openIndex === globalIndex

                return (
                  <div
                    key={index}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                  >
                    <button
                      onClick={() => toggleQuestion(globalIndex)}
                      className="w-full px-4 py-3 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <span className="font-semibold text-gray-800 dark:text-gray-200">
                        {faq.q}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">
                        {isOpen ? '−' : '+'}
                      </span>
                    </button>
                    {isOpen && (
                      <div className="px-4 py-3 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                        <p className="text-gray-600 dark:text-gray-400">{faq.a}</p>
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </Card>
        ))}
      </div>

      <Card className="mt-8 text-center">
        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">
          Не знайшли відповідь?
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Зв'яжіться з нами, і ми з радістю допоможемо вам
        </p>
        <a
          href="mailto:info@charityfund.ua"
          className="inline-block px-6 py-3 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
        >
          Написати нам
        </a>
      </Card>
    </div>
  )
}

export default FAQPage

