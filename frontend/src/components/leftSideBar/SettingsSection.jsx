import React from 'react'
import FullScreenButton from '../ui/FullScreenButton'
import ThemeTogglingBtn from '../ui/themeTogglingBtn'


function SettingsSection() {
  return (
    <div className='flex flex-col gap-1 pb-2'>
        <FullScreenButton />
        <ThemeTogglingBtn/>
    </div>

  )
}

export default SettingsSection