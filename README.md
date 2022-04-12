## Встановлення Windows Terminal

1. Переходимо сюди і встановлюємо - [Windows Terminal](https://www.microsoft.com/uk-ua/p/windows-terminal/9n0dx20hk701?rtc=1&activetab=pivot:overviewtab)
2. Відкриваємо Windows Terminal і переходимо в налаштування
3. На вкладці Startup ставимо галку Attack to the most recently used window і вибираємо свій профіль
4. На вкладці Default та свого профілю Ставимо галку User parent process directory
5. Зберігаємо зміни і користуємось

## Встановлення oh-my-posh на Windows(для інформації про гіт репо в терміналі)
1. В терміналі пишемо команди
    - 'Install-Module oh-my-posh -Scope CurrentUser'
    - `code $PROFILE`
2. У файлі що відкрився пишемо 
  `Import-Module oh-my-posh
  Set-Theme robbyrussell`
3. За бажанням тему до вподоби можна вибрати ось тут - [Oh My Posh Themes](https://ohmyposh.dev/docs/themes)
4. Зберігаємо файл
5. Встановлюємо шрифт з підтримкою іконок(DroidSansMono хороший) - [Nerd Fonts](https://www.nerdfonts.com/font-downloads)
6. У Windows Terminal заходимо в Налаштування -> Defaults -> Appearance -> Font Face і вибираємо свій шрифт
7. Зберігаємо налаштування і перезапускаємо термінал
8. Користуємось
