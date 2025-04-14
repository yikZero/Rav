const ravConfig = {
  title: 'Rav',
  author: 'yikZero',
  siteUrl:
    process.env.NODE_ENV === 'production'
      ? 'https://rav.yikzero.com'
      : 'http://localhost:11300',
  description:
    "Hi, I'm yikZero, also known as Zhang Yiji, a Product Designer based in Hangzhou, currently focusing on product design in the Web3. In my free time, I enjoy hiking, cycling, coding, and exploring new things. Welcome to be my friend.",
  email: 'yiikzero@gmail.com',
  since: '2023',
} as const;

export default ravConfig;
