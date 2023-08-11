import {reactive} from 'vue';

export const store = reactive({
    name: 'Thanh Vinh Nguyen', // name
    summary: 'Student | Hobbyist Software Developer', // summary (appears after name)

    address: 'Burwood, VIC, Australia 3125',
    email: 'ngtv0404@gmail.com',
    phone: [
        /* phone numbers */
        {
        number: '+61 422 768 710', 
        // desc: 'Australia' // can be left blank
        desc: ''
        },
        // {
        //     number: '+84 976 822 600',
        //     desc: 'Vietnam'
        // }
    ],

    gh_account: 'https://github.com/itsmevjnk', // GitHub user page
    gh_source: 'https://github.com/itsmevjnk/itsmevjnk.github.io', // link to GitHub repo of the website (leave it blank if there is none)

    about:
        'I am a hardworking first-year computer science student with a passion for programming and discovering, as well as a great attention to detail and a continuing pursuit for perfection. \
         Having been writing programs and designing embedded systems as a hobby from a young age, I gained a variety of knowledge and experience in the field, and I am confident in my ability to apply them into more sophisticated projects. \
         I am always seeking new challenges to overcome and gain more experience from.',
    
    education: [
        {
            image: '/src/assets/logo/deakin.svg',
            title: 'Bachelor of Computer Science',
            title_url: '',
            subtitle: 'Deakin University, Melbourne Burwood Campus',
            subtitle_url: 'https://www.deakin.edu.au/',
            period: 'July 2023 - now',
            points: [
                'Expected completion date: June 2026',
                'Major: Robotics (will commence in 2024)'
            ]
        },
        {
            image: '/src/assets/logo/cva.png',
            title: 'National High School Graduation Certificate (Vietnam)',
            title_url: '',
            subtitle: 'Chu Van An National High School, Hanoi',
            subtitle_url: 'https://c3chuvanan.edu.vn/',
            period: 'August 2020 - June 2023',
            points: [
                'Major: Physics',
                'Achieved First Prize at 2022-2023 Hanoi Physics Olympiad'
            ]
        },
    ],

    projects: [
        {
            image: '',
            title: 'Wireless PlayStation 2 controller alternative',
            title_url: 'https://github.com/itsmevjnk/Arduino-PS2X_AltRadio',
            subtitle: 'Investigation for the 2023 Vietnam Robotics Challenge',
            subtitle_url: '',
            period: 'September 2022 - June 2023',
            points: [
                'Aimed to rectify reliability issues present in available controllers',
                'Developed a paired transmitter and receiver operating on the sub-GHz and 2.4GHz bands'
            ]
        },
        {
            image: '',
            title: 'Arduino PlayStation 2 controller library',
            title_url: 'https://github.com/itsmevjnk/Arduino-PS2X',
            subtitle: 'Bug fixes',
            subtitle_url: '',
            period: 'August 2022 - September 2022',
            points: [
                'Fixed protocol timing bug and added support for ESP32 platform',
                'Implemented alternate functions for ease of use'
            ]
        },
        {
            image: '',
            title: 'Event website WordPress template',
            title_url: '',
            subtitle: 'Developed for high school club fair event, source code not public',
            subtitle_url: '',
            period: 'December 2021',
            points: [
                'Includes static pages (Home and About us), posts list display by category/tag, and single post display templates',
                'Reached production-ready status in 7 days',
                'Written in HTML and PHP, with JavaScript components'
            ]
        },
        {
            image: '',
            title: 'Facebook post data scraping tool',
            title_url: 'https://github.com/itsmevjnk/HRng',
            subtitle: 'Personal open-source software project',
            subtitle_url: '',
            period: 'February 2021 - now',
            points: [
                'Geared towards usage for checking completion of content seeding tasks',
                'Written in Python (as prototype) and C# (as final product)'
            ]
        }
    ]
});