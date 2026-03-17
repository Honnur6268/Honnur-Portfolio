export const profile = {
  name: 'Honnur Ali',
  role: 'Java Backend Developer',
  tagline: 'I architect scalable distributed systems and high-throughput APIs that power real-world products.',
  email: 'honnurcse.rymec@gmail.com',
  location: 'Bengaluru, India',
  github: 'https://github.com/Honnur6268',
  linkedin: 'https://www.linkedin.com/in/honnur-ali',
  resumeUrl: '#',
  about: `Backend engineer with 4+ years of experience building production-grade distributed systems.
I specialize in Java and Spring Boot ecosystems — designing microservices, event-driven architectures
with Kafka, and deploying cloud-native applications on AWS. I care deeply about clean architecture,
performance optimization, and writing code that scales.`,
  stats: [
    { value: '4+', label: 'Years of Experience' },
    { value: '5+', label: 'Projects Shipped' },
    { value: '12+', label: 'Technologies' },
  ],
};

export const skills = [
  {
    category: 'Backend',
    items: [
      { name: 'Java', pct: 95 },
      { name: 'Spring Boot', pct: 92 },
      { name: 'Rust', pct: 50 },
      { name: 'Cargo', pct: 50 },
      { name: 'Microservices', pct: 80 },
      { name: 'REST APIs', pct: 93 },
      { name: 'Kafka', pct: 50},
    ],
  },
  {
    category: 'Databases',
    items: [
      { name: 'MongoDB', pct: 85 },
      { name: 'MySQL', pct: 80 },
      { name: 'Redis', pct: 65 },
      {name: 'Oracle SQL', pct: 65 },
    ],
  },
  {
    category: 'DevOps',
    items: [
      { name: 'Docker', pct: 85 },
      { name: 'Kubernetes', pct: 75 },
      {name: 'Jenkins', pct: 70 },
      { name: 'AWS', pct: 78 },
    ],
  },
  {
    category: 'Frontend',
    items: [
      { name: 'HTML/CSS', pct: 55 },
      { name: 'JavaScript', pct: 55 },
      { name: 'React', pct: 55 },
    ],
  },
];

export const projects = [
  {
    title: 'UPI Payment Switch',
    desc: 'High-throughput payment processing backend handling 10K+ TPS with fault-tolerant architecture, retry mechanisms, and real-time monitoring.',
    tech: ['Java', 'Spring Boot', 'Kafka', 'Redis', 'MySQL'],
    github: 'https://github.com',
    demo: null,
  },
  {
    title: 'Voucher Management Platform',
    desc: 'End-to-end voucher lifecycle management — generation, validation, redemption — with secure APIs and analytics.',
    tech: ['Spring Boot', 'MongoDB', 'REST APIs', 'Docker'],
    github: 'https://github.com',
    demo: null,
  },
  {
    title: 'Merchant Acquirer Switch',
    desc: 'Transaction routing engine with Kafka-based event processing, merchant onboarding flows, and PCI DSS compliance.',
    tech: ['Java', 'Kafka', 'Spring Boot', 'Redis', 'AWS'],
    github: 'https://github.com',
    demo: null,
  }
];

export const experiences = [
  {
    role: 'Backend SDE 2',
    company: 'Neokred Technologies Private Limited',
    period: 'Nov 2023 – Present',
    items: [
      'Developed microservices for order management with Spring Boot and JPA',
      'Implemented Redis caching layer reducing p95 latency by 60%',
      'Set up CI/CD pipelines with Jenkins, Docker, and automated test suites',
      'Collaborated in Agile sprints delivering features on 2-week cadence',
    ],
  },
   {
    role: 'System Engineer',
    company: 'Axya Digital Private Limited',
    period: 'Aug 2022 – Jul 2023',
    items: [
      'Developed microservices for order management with Spring Boot and JPA',
      'Implemented Redis caching layer reducing p95 latency by 60%',
      'Set up CI/CD pipelines with Jenkins, Docker, and automated test suites',
      'Collaborated in Agile sprints delivering features on 2-week cadence',
    ],
  },
  {
    role: 'Associate Software Engineer',
    company: 'Virtusa Consulting Services Private Limited',
    period: 'May 2021 – Aug 2022',
    items: [
      'Designed and built scalable backend APIs processing 100K+ daily transactions',
      'Implemented Kafka-based asynchronous event pipelines with DLQ retry patterns',
      'Architected microservice decomposition for a monolithic payment system',
      'Built UPI payment switch handling real-time transaction routing',
      'Led code reviews and mentored 3 junior engineers on Spring Boot best practices',
    ],
  }
];
