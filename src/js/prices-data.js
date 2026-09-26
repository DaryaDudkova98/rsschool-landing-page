const STUDIO_LINKS = [
    {
        label: 'Фотостудии Минска — каталог',
        url: 'https://fotostydia.by/fotostudii-minska/',
    },
    {
        label: 'PhotoHub',
        url: 'https://photohub.by/',
    },
    {
        label: 'StudioGo — залы Минска',
        url: 'https://studiogo.ru/minsk/halls',
    },
];

export const PRICES_DATA = {
    individual: {
        title: 'Individual',
        groups: [
            {
                name: 'duration',
                default: 'express',
                options: {
                    express: {
                        label: 'Express',
                        items: [
                            '30 min shooting',
                            '30 edited photos',
                            'Photos delivered in digital format',
                            'Ready photos in 7–10 days',
                        ],
                    },
                    optimal: {
                        label: 'Optimal',
                        items: [
                            '60 min shooting',
                            '60 edited photos',
                            'Photos delivered in digital format',
                            'Ready photos in 10–14 days',
                        ],
                    },
                },
            },
            {
                name: 'location',
                default: 'street',
                options: {
                    street: {
                        label: 'Street',
                        items: [
                            'Outdoor city locations',
                            'Natural light',
                            'Urban background',
                        ],
                    },
                    studio: {
                        label: 'Studio',
                        items: [
                            'Indoor studio',
                            'Professional lighting included',
                            'Neutral background',
                        ],
                        links: STUDIO_LINKS,
                    },
                    home: {
                        label: 'Home',
                        items: [
                            'At your home',
                            'Cozy atmosphere',
                            'Natural light or portable lighting',
                        ],
                    },
                },
            },
        ],
    },

    street: {
        title: 'Street',
        groups: [
            {
                name: 'duration',
                default: 'express',
                options: {
                    express: {
                        label: 'Express',
                        items: [
                            '30 min shooting',
                            '25 edited photos',
                            'Photos delivered in digital format',
                            'Ready photos in 7–10 days',
                        ],
                    },
                    optimal: {
                        label: 'Optimal',
                        items: [
                            '60 min shooting',
                            '50 edited photos',
                            'Photos delivered in digital format',
                            'Ready photos in 10–14 days',
                        ],
                    },
                },
            },
            {
                name: 'location',
                default: 'street',
                options: {
                    street: {
                        label: 'Street',
                        items: [
                            'City streets and squares',
                            'Urban architecture',
                            'Natural light',
                        ],
                    },
                    studio: {
                        label: 'Studio',
                        items: [
                            'Indoor studio',
                            'Professional lighting included',
                            'Controlled environment',
                        ],
                        links: STUDIO_LINKS,
                    },
                    home: {
                        label: 'Home',
                        items: [
                            'At your home',
                            'Relaxed atmosphere',
                            'Family-friendly setting',
                        ],
                    },
                },
            },
        ],
    },

    family: {
        title: 'Family',
        groups: [
            {
                name: 'duration',
                default: 'express',
                options: {
                    express: {
                        label: 'Express',
                        items: [
                            '45 min shooting',
                            '30 edited photos',
                            'Photos delivered in digital format',
                            'Ready photos in 7–10 days',
                        ],
                    },
                    optimal: {
                        label: 'Optimal',
                        items: [
                            '90 min shooting',
                            '60 edited photos',
                            'Photos delivered in digital format',
                            'Ready photos in 10–14 days',
                        ],
                    },
                },
            },
            {
                name: 'location',
                default: 'street',
                options: {
                    street: {
                        label: 'Street',
                        items: [
                            'Park or city locations',
                            'Natural light',
                            'Candid family moments',
                        ],
                    },
                    studio: {
                        label: 'Studio',
                        items: [
                            'Indoor studio',
                            'Professional lighting included',
                            'Group and individual portraits',
                        ],
                        links: STUDIO_LINKS,
                    },
                    home: {
                        label: 'Home',
                        items: [
                            'At your home',
                            'Cozy family atmosphere',
                            'Natural light or portable lighting',
                        ],
                    },
                },
            },
        ],
    },

    'love-story': {
        title: 'Love Story',
        groups: [
            {
                name: 'duration',
                default: 'express',
                options: {
                    express: {
                        label: 'Express',
                        items: [
                            '45 min shooting',
                            '30 edited photos',
                            'Photos delivered in digital format',
                            'Ready photos in 7–10 days',
                        ],
                    },
                    optimal: {
                        label: 'Optimal',
                        items: [
                            '90 min shooting',
                            '70 edited photos',
                            'Photos delivered in digital format',
                            'Ready photos in 10–14 days',
                        ],
                    },
                },
            },
            {
                name: 'location',
                default: 'street',
                options: {
                    street: {
                        label: 'Street',
                        items: [
                            'Romantic city locations',
                            'Natural light',
                            'Candid couple moments',
                        ],
                    },
                    studio: {
                        label: 'Studio',
                        items: [
                            'Indoor studio',
                            'Professional lighting included',
                            'Stylized romantic setup',
                        ],
                        links: STUDIO_LINKS,
                    },
                    home: {
                        label: 'Home',
                        items: [
                            'At your home',
                            'Intimate atmosphere',
                            'Natural light or portable lighting',
                        ],
                    },
                },
            },
        ],
    },
};