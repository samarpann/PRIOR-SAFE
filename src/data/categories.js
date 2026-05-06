import { 
  Shield, 
  Hand, 
  Shirt, 
  Footprints, 
  Anchor,
  User,
  Zap,
  Ear,
  Eye,
  Wind
} from 'lucide-react';

export const CATEGORY_STRUCTURE = {
  'Head protection': {
    icon: Shield,
    subCategories: [
      'Skull protection',
      'Hearing protection',
      'Protective eyewear',
      'Respiratory protection',
      'All products'
    ]
  },
  'Safety gloves': {
    icon: Hand,
    subCategories: [
      'Cut protection',
      'Thermal protection',
      'Chemical protection',
      'Mechanical protection for precision works',
      'Mechanical protection for multi purpose works',
      'Mechanical protection for heavy works',
      'Craftman\'s protection',
      'All products'
    ]
  },
  'Protective clothing': {
    icon: Shirt,
    subCategories: [
      'Workwear',
      'Technical wear',
      'Outdoor wear',
      'Disposable wear',
      'All products'
    ]
  },
  'Safety footwear': {
    icon: Footprints,
    subCategories: [
      'Sport',
      'Outdoor',
      'Indoor',
      'All products'
    ]
  },
  'Fall protection': {
    icon: Anchor,
    subCategories: [
      'Anchorage - Work positioning',
      'Body support',
      'Connecting systems',
      'Fall arrester systems',
      'All products'
    ]
  }
};

export const ALL_CATEGORIES = Object.keys(CATEGORY_STRUCTURE);

export const SECTORS = [
  'Construction',
  'Oil & Gas',
  'Mining',
  'Manufacturing',
  'Chemical',
  'Power & Utilities',
  'Agriculture'
];

export const RISKS = [
  'Impact',
  'Fall from height',
  'Chemical splash',
  'Heat & Flame',
  'Electrical arc',
  'Noise',
  'Respiratory hazards'
];
