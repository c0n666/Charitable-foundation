import { useState } from 'react'
import { FaFacebook, FaTwitter, FaTelegram, FaViber, FaCopy, FaCheck } from 'react-icons/fa'
import Button from './Button'

const SocialShare = ({ url, title, description }) => {
  const [copied, setCopied] = useState(false)

  const shareUrl = url || window.location.href
  const shareTitle = title || 'Благодійний фонд'
  const shareText = description || 'Підтримайте благодійну кампанію!'

  const shareToFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      '_blank',
      'width=600,height=400'
    )
  }

  const shareToTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
      '_blank',
      'width=600,height=400'
    )
  }

  const shareToTelegram = () => {
    window.open(
      `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`,
      '_blank'
    )
  }

  const shareToViber = () => {
    window.open(
      `viber://forward?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
      '_blank'
    )
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error('Failed to copy:', error)
    }
  }

  return (
    <div className="space-y-2">
      <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
        Поділитися:
      </div>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="secondary"
          onClick={shareToFacebook}
          className="flex items-center space-x-2"
        >
          <FaFacebook className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <span>Facebook</span>
        </Button>
        <Button
          variant="secondary"
          onClick={shareToTwitter}
          className="flex items-center space-x-2"
        >
          <FaTwitter className="w-4 h-4 text-blue-400 dark:text-blue-300" />
          <span>Twitter</span>
        </Button>
        <Button
          variant="secondary"
          onClick={shareToTelegram}
          className="flex items-center space-x-2"
        >
          <FaTelegram className="w-4 h-4 text-blue-500 dark:text-blue-400" />
          <span>Telegram</span>
        </Button>
        <Button
          variant="secondary"
          onClick={shareToViber}
          className="flex items-center space-x-2"
        >
          <FaViber className="w-4 h-4 text-purple-600 dark:text-purple-400" />
          <span>Viber</span>
        </Button>
        <Button
          variant="secondary"
          onClick={copyToClipboard}
          className="flex items-center space-x-2"
        >
          {copied ? (
            <FaCheck className="w-4 h-4 text-green-500 dark:text-green-400" />
          ) : (
            <FaCopy className="w-4 h-4 text-gray-600 dark:text-gray-400" />
          )}
          <span>{copied ? 'Скопійовано!' : 'Копіювати'}</span>
        </Button>
      </div>
    </div>
  )
}

export default SocialShare

