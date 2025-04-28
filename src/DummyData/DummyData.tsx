interface Data {
  date: string;
  description: string;
  portfolioId: number;
  title: string;
  url: string[];
}
type Partner = {
  partnerId: number;
  url: string;
  name: string;
  address: string;
};
type Business = {
  portfolioId: number;
  url: string[];
  title: string;
  description: string;
  date: string;
};
export const profileDummy: Data[] = [
  {
    date: '2025-04-27',
    description: 'A sample portfolio description about a tech startup.',
    portfolioId: 1,
    title: 'profile1',
    url: ['../assets/Profile/Profile1.jpg'],
  },
  {
    date: '2025-03-15',
    description: 'An investment in a sustainable energy project.',
    portfolioId: 2,
    title: 'profile2',
    url: ['../assets/Profile/Profile2.jpg'],
  },
  {
    date: '2025-01-05',
    description: 'A portfolio related to AI and Machine Learning innovations.',
    portfolioId: 3,
    title: 'profile3',
    url: ['../assets/Profile/Profile3.jpg'],
  },
  {
    date: '2024-12-20',
    description: 'A collection of investments in the healthcare sector.',
    portfolioId: 4,
    title: 'profile4',
    url: ['../assets/Profile/Profile4.jpg'],
  },
  {
    date: '2024-11-10',
    description: 'Supporting education technology platforms.',
    portfolioId: 5,
    title: 'profile5',
    url: ['../assets/Profile/Profile5.jpg'],
  },
];

export const partnersDummy: Partner[] = [
  {
    partnerId: 1,
    url: 'https://dummyimage.com/100x100/000/fff.png&text=Company+A',
    name: 'Alpha Partners',
    address: '123 Main St, New York, NY 10001, USA',
  },
  {
    partnerId: 2,
    url: 'https://dummyimage.com/100x100/000/fff.png&text=Company+B',
    name: 'Beta Ventures',
    address: '456 Market St, San Francisco, CA 94105, USA',
  },
  {
    partnerId: 3,
    url: 'https://dummyimage.com/100x100/000/fff.png&text=Company+C',
    name: 'Gamma Capital',
    address: '789 King Rd, London, UK',
  },
  {
    partnerId: 4,
    url: 'https://dummyimage.com/100x100/000/fff.png&text=Company+D',
    name: 'Delta Investments',
    address: '321 Queen St, Toronto, ON, Canada',
  },
  {
    partnerId: 5,
    url: 'https://dummyimage.com/100x100/000/fff.png&text=Company+E',
    name: 'Epsilon Group',
    address: '159 Cherry Blossom Ave, Tokyo, Japan',
  },
];

export const businessesDummy: Business[] = [
  {
    portfolioId: 1,
    url: [
      '../assets/Business/Business1.jpg',
      '../assets/Business/Business2.jpg',
      '../assets/Business/Business10.jpg',
    ],
    title: 'Events1',
    description: 'Seoul Art Center',
    date: '2025-04-25',
  },
  {
    portfolioId: 2,
    url: [
      '../assets/Business/Business3.jpg',
      '../assets/Business/Business9.jpg',
    ],
    title: 'Events2',
    description: 'Busan Exhibition Hall',
    date: '2025-04-20',
  },
  {
    portfolioId: 3,
    url: [
      '../assets/Business/Business4.jpg',
      '../assets/Business/Business5.jpg',
    ],
    title: 'Events3',
    description: 'Incheon Culture Center',
    date: '2025-03-30',
  },
  {
    portfolioId: 4,
    url: [
      '../assets/Business/Business6.jpg',
      '../assets/Business/Business8.jpg',
    ],
    title: 'Events4',
    description: 'Daegu Community Hall',
    date: '2025-03-10',
  },
  {
    portfolioId: 5,
    url: [
      '../assets/Business/Business7.jpg',
      '../assets/Business/Business11.jpg',
      '../assets/Business/Business12.jpg',
    ],
    title: 'Events5',
    description: 'Daejeon Conference Center',
    date: '2025-02-15',
  },
];
