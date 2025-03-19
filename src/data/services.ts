
import { Service, Priest } from '@/lib/types';

export const services: Service[] = [
  {
    id: "mercury-homam",
    name: "Mercury Homam (Havan)",
    shortDescription: "Intelligence, decision-making skills, and communication.",
    description: "Mercury Homam is a sacred fire ritual dedicated to the planet Mercury (Budha) to enhance intellectual abilities, decision-making skills, and clear communication. The ritual involves chanting specific mantras and making offerings to the fire to invoke the blessings of Lord Budha.",
    benefits: [
      "Enhances intelligence and analytical skills",
      "Improves communication abilities",
      "Helps in making better decisions",
      "Removes obstacles in education and business",
      "Enhances memory and concentration"
    ],
    purpose: "To seek blessings from Mercury for improved intellect, communication skills, and decision-making abilities.",
    whenPerformed: "Performed during Mercury's auspicious periods, especially on Wednesdays, and during specific planetary transitions.",
    price: 2100,
    duration: "2 hours",
    images: {
      main: "/lovable-uploads/88ada7e8-1652-48d8-8145-ee76c1b60baf.png",
      gallery: [
        "/lovable-uploads/88ada7e8-1652-48d8-8145-ee76c1b60baf.png",
        "/lovable-uploads/88ada7e8-1652-48d8-8145-ee76c1b60baf.png"
      ]
    }
  },
  {
    id: "venus-homam",
    name: "Venus Homam (Havan)",
    shortDescription: "Happiness, wealth, and harmonious relationships.",
    description: "Venus Homam is a sacred ritual performed to please the planet Venus (Shukra) which governs love, relationships, luxury, and wealth. Through this ritual, devotees seek blessings for a harmonious married life, happiness, and material abundance.",
    benefits: [
      "Blesses with a harmonious relationship with spouse",
      "Attracts wealth and luxury in life",
      "Enhances beauty and charm",
      "Helps in finding a suitable life partner",
      "Resolves conflicts in relationships"
    ],
    purpose: "To seek blessings from Venus for harmonious relationships, marriage, and material prosperity.",
    whenPerformed: "Preferably performed on Fridays, which is the day governed by Venus, and during specific Venus-favorable astrological times.",
    price: 2500,
    duration: "2.5 hours",
    images: {
      main: "/lovable-uploads/88ada7e8-1652-48d8-8145-ee76c1b60baf.png",
      gallery: [
        "/lovable-uploads/88ada7e8-1652-48d8-8145-ee76c1b60baf.png"
      ]
    }
  },
  {
    id: "business-homam",
    name: "Homa For Business Growth",
    shortDescription: "Business growth, wealth generation, and enemies offset.",
    description: "This specialized Homam is performed specifically for entrepreneurs and business people to attract prosperity, growth, and success in their ventures. It combines elements from various Vedic rituals aimed at removing obstacles in business and attracting wealth and opportunities.",
    benefits: [
      "Accelerates business growth and expansion",
      "Helps in attracting new clients and opportunities",
      "Removes obstacles and competition in business",
      "Promotes financial stability and profit growth",
      "Provides protection from business enemies and negative influences"
    ],
    purpose: "To invoke divine blessings for business success, wealth generation, and protection from competitors.",
    whenPerformed: "Can be performed during business inaugurations, anniversaries, or during astrologically favorable times for financial growth.",
    price: 3500,
    duration: "3 hours",
    images: {
      main: "/lovable-uploads/88ada7e8-1652-48d8-8145-ee76c1b60baf.png",
      gallery: [
        "/lovable-uploads/88ada7e8-1652-48d8-8145-ee76c1b60baf.png"
      ]
    }
  },
  {
    id: "rudra-homam",
    name: "Adi Rudra Homam (Havan)",
    shortDescription: "Political success, power, and long-term ruling.",
    description: "Adi Rudra Homam is a powerful ritual dedicated to Lord Shiva in his fierce Rudra form. This grand ceremony involves extensive chanting of the Rudram and thousands of offerings to the sacred fire. It is particularly beneficial for those seeking political power, authority, and long-term success in leadership positions.",
    benefits: [
      "Bestows political success and leadership qualities",
      "Grants power, authority, and influence",
      "Ensures long-term stability in ruling positions",
      "Removes obstacles in career advancement",
      "Provides protection from enemies and rivals"
    ],
    purpose: "To invoke the fierce energy of Lord Rudra for gaining power, authority, and success in leadership roles.",
    whenPerformed: "Performed during Shiva-auspicious times, particularly on Mondays, during Pradosham, or during specific planetary alignments favorable for power acquisition.",
    price: 10800,
    duration: "8 hours",
    images: {
      main: "/lovable-uploads/88ada7e8-1652-48d8-8145-ee76c1b60baf.png",
      gallery: [
        "/lovable-uploads/88ada7e8-1652-48d8-8145-ee76c1b60baf.png"
      ]
    },
    performedBy: "108 Pandits"
  },
  {
    id: "rudra-homam-simple",
    name: "Rudra Homam",
    shortDescription: "To seek Lord Shiva's blessings for longer life.",
    description: "Rudra Homam is a sacred fire ritual dedicated to Lord Shiva in his Rudra form, performed to seek his divine blessings for a long and healthy life. The ritual involves chanting of the powerful Rudram and making offerings to the ceremonial fire.",
    benefits: [
      "Blesses with longevity and good health",
      "Removes obstacles and dangers in life",
      "Provides protection from negative energies",
      "Purifies the environment and brings peace",
      "Helps in spiritual growth and self-transformation"
    ],
    purpose: "To seek the blessings of Lord Shiva for a long, healthy, and prosperous life free from obstacles.",
    whenPerformed: "Performed on Mondays, during Pradosham, Shivaratri, or during specific astrological alignments favorable for longevity.",
    price: 3100,
    duration: "3 hours",
    images: {
      main: "/lovable-uploads/88ada7e8-1652-48d8-8145-ee76c1b60baf.png",
      gallery: [
        "/lovable-uploads/88ada7e8-1652-48d8-8145-ee76c1b60baf.png"
      ]
    }
  },
  {
    id: "parvathi-homam",
    name: "Swayamvara Parvathi Homam (Havan)",
    shortDescription: "Helps devotees to find a suitable life partner.",
    description: "Swayamvara Parvathi Homam is dedicated to Goddess Parvathi, who found her ideal partner in Lord Shiva. This ritual is performed to seek her blessings for finding a perfect life partner who is compatible in all aspects and to ensure a harmonious married life.",
    benefits: [
      "Helps in finding a suitable life partner with compatible qualities",
      "Removes obstacles in marriage",
      "Ensures harmony and understanding in marital life",
      "Blesses with a loving and caring spouse",
      "Helps in resolving relationship issues for the unmarried"
    ],
    purpose: "To seek Goddess Parvathi's blessings for finding an ideal life partner and ensuring a happy married life.",
    whenPerformed: "Performed during auspicious marriage times, on Fridays, or during specific Navaratri celebrations dedicated to Goddess Parvathi.",
    price: 2800,
    duration: "2.5 hours",
    images: {
      main: "/lovable-uploads/88ada7e8-1652-48d8-8145-ee76c1b60baf.png",
      gallery: [
        "/lovable-uploads/88ada7e8-1652-48d8-8145-ee76c1b60baf.png"
      ]
    }
  }
];

export const priests: Priest[] = [
  {
    id: "priest-1",
    name: "Pandit Ramakrishna Sharma",
    image: "https://images.unsplash.com/photo-1566753323558-f4e0952af115?q=80&w=1000&auto=format&fit=crop",
    rating: 4.9,
    languages: ["Sanskrit", "Hindi", "English", "Tamil"],
    experience: 25,
    specializations: ["Rudra Homam", "Business Growth Rituals", "Marriage Ceremonies"],
    price: 5000,
    availability: ["Monday", "Wednesday", "Friday", "Saturday"],
    reviews: [
      {
        id: "rev-1",
        userName: "Vijay Mehta",
        rating: 5,
        comment: "Exceptional knowledge and flawless execution of the ritual. Very satisfied with the results.",
        date: "2023-10-15"
      },
      {
        id: "rev-2",
        userName: "Priya Sharma",
        rating: 4.8,
        comment: "Very thorough and patient in explaining the significance of each step. Would highly recommend!",
        date: "2023-09-22"
      }
    ]
  },
  {
    id: "priest-2",
    name: "Acharya Vidyasagar",
    image: "https://plus.unsplash.com/premium_photo-1661764878654-3d0fc2eefcca?q=80&w=1000&auto=format&fit=crop",
    rating: 4.8,
    languages: ["Sanskrit", "Hindi", "English", "Marathi"],
    experience: 30,
    specializations: ["Venus Homam", "Mercury Homam", "Prosperity Rituals"],
    price: 5500,
    availability: ["Tuesday", "Thursday", "Friday", "Sunday"],
    reviews: [
      {
        id: "rev-3",
        userName: "Rahul Desai",
        rating: 5,
        comment: "Unparalleled knowledge of Vedic rituals. The ceremony was conducted with great devotion.",
        date: "2023-11-05"
      }
    ]
  },
  {
    id: "priest-3",
    name: "Pandit Vishnu Trivedi",
    image: "https://images.unsplash.com/photo-1623604427585-13bbaa7ec0ad?q=80&w=1000&auto=format&fit=crop",
    rating: 4.7,
    languages: ["Sanskrit", "Hindi", "Gujarati", "English"],
    experience: 20,
    specializations: ["Ganapati Homam", "Navagraha Homam", "Career Success Rituals"],
    price: 4500,
    availability: ["Monday", "Tuesday", "Saturday", "Sunday"],
    reviews: [
      {
        id: "rev-4",
        userName: "Ananya Patel",
        rating: 4.7,
        comment: "Very professional and authentic. The ritual was performed exactly as described in the ancient texts.",
        date: "2023-08-17"
      }
    ]
  }
];
