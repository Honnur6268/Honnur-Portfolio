export const profile = {
  name: 'Honnur Ali',
  role: 'Java Backend Developer',
  tagline: 'I architect scalable distributed systems and high-throughput APIs that power real-world products.',
  email: 'honnurcse.rymec@gmail.com',
  location: 'Bengaluru, India',
  github: 'https://github.com/Honnur6268',
  linkedin: 'https://www.linkedin.com/in/honnur-ali',
  resumeUrl: 'https://honnur-portfolio-bucket.s3.ap-south-1.amazonaws.com/Honnur-Ali_Resume.pdf',
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
      { name: 'Docker', pct: 65 },
      { name: 'Kubernetes', pct: 65 },
      {name: 'Jenkins', pct: 65 },
      { name: 'AWS', pct: 50 },
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

export const workProjects = [
  {
    title: 'UPI Switch - Merchant Acquirer',
    impact: 'Handles 10K+ daily UPI transactions with real-time routing',
    current: true,
    tech: ['Java', 'Spring Boot', 'MongoDB', 'Kafka', 'Redis'],
    contributions: [
      'Built merchant routing logic for transaction switching',
      'Implemented validation and processing pipelines',
      'Worked on high-throughput transaction flow with Kafka events',
    ],
  },
  {
    title: 'Merchant Management System',
    impact: 'Achieved 3x faster response times with Rust backend',
    current: true,
    tech: ['Rust', 'Cargo', 'MongoDB',],
    contributions: [
      'Developed secure APIs in Rust for merchant operations',
      'Implemented business logic for merchant lifecycle',
      'Improved system performance with zero-cost abstractions',
    ],
  },
  {
    title: 'Perkle Voucher System',
    impact: 'Enabled 5K+ voucher redemptions per month',
    tech: ['Java', 'Spring Boot', 'MongoDB', 'REST APIs'],
    contributions: [
      'Built voucher adding from vendors and buying APIs',
      'Designed scalable backend logic for high-volume processing',
      'Integrated vendor-based vochers in the system',
    ],
  },
  {
    title: 'Equitas VAN Validation',
    impact: 'Reduced payment failures by 35% with real-time verification',
    tech: ['Java', 'Spring Boot', 'REST APIs'],
    contributions: [
      'Implemented validation logic for virtual account numbers',
      'Implemented validate and notify APIs for real-time VAN verification',
      'Ensured secure API processing with error handling',
    ],
  },
];

export const personalProjects = [
  {
    title: 'Online Reservation System',
    impact: 'End-to-end booking platform',
    tech: ['Java', 'JSP', 'Servlets', 'JSTL', 'MySQL'],
    contributions: [
      'Online ticket booking with seat selection',
      'Implemented ticket display and downloading APIs',
      'User authentication and booking history',
    ],
  },
];

export const academicProjects = [
  {
    title: 'IoT Fall Detection System for Elderly People',
    impact: 'Real-time fall detection with instant emergency alerts',
    tech: ['Arduino', 'Accelerometer', 'Gyroscope', 'Firebase'],
    contributions: [
      'Real-time fall detection using sensor data',
      'Emergency notification and call to predefined contacts',
      'Firebase integration for data storage and alerts',
    ],
  },
];

export const experiences = [
  {
    role: 'Backend SDE 2',
    company: 'Neokred Technologies Private Limited',
    period: 'Nov 2023 – Present',
    items: [
      'Implemented UPI Switch - Merchant Acquirer system handling 10K+ daily transactions',
      'Implemented Van Validation system for Equitas Bank to securly validate virtual account numbers in real-time',
      'Implemented secure APIs for a Rust-based Merchant Management System improving performance by 3x',
      'Implemented Perkle Voucher System',
      'Implemented Redis caching layer and Kafka-based publish-subscribe pipelines',
      'Collaborated in Agile sprints delivering features on 2-week cadence',
    ],
  },
   {
    role: 'System Engineer',
    company: 'Axya Digital Private Limited',
    period: 'Aug 2022 – Jul 2023',
    items: [
      'Completed Java Microservices certification with AXYYA Digital',
      'Designed and implemented Flight Management System with Spring Boot and MySQL as a training project',
      'Worked on internal Resource Requisition System with Java, Spring Boot and ReactJS',
    ],
  },
  {
    role: 'Associate Software Engineer',
    company: 'Virtusa Consulting Services Private Limited',
    period: 'May 2021 – Aug 2022',
    items: [
      'Completed Training in Java, Hiberante, Spring Boot, Microservices, REST APIs',
      'Designed and Implemented a Smart Bank System as a training project',
      'Achieved Oracle Certified Associate - Java SE 8 Programmer certification',
    ],
  }
];

export const certifications = [
  {
    title: 'Oracle Certified Associate',
    subtitle: 'Java SE 8 Programmer',
    org: 'Oracle',
    type: 'certification',
    icon: 'oracle',
  },
  {
    title: 'Java Microservices',
    subtitle: 'Microservices Architecture with Spring Boot',
    org: 'AXYYA Digital',
    type: 'certification',
    icon: 'microservices',
  },
];

export const internship = {
  title: 'Internet of Things',
  subtitle: 'IoT Development & Applications',
  org: 'Knowx Private Ltd, Bangalore',
  type: 'internship',
  icon: 'iot',
};
