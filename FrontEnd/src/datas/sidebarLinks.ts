import { FiHome, FiFlag, FiLayers, FiUsers } from "react-icons/fi";
import {
  PiMotorcycleFill,
  PiCarFill,
  PiVanFill,
  PiTruckFill,
  PiPianoKeysFill,
  PiPawPrintFill,
  PiSealQuestionFill,
  PiAirplaneTiltLight,
  PiReceiptLight,
  PiTruckLight,
  PiTruckBold,
  PiGavelBold,
  PiCheckCircleBold,
  PiThumbsUpBold,
  PiXCircleBold,
  PiPackage,
  PiCouchFill,
  PiTractorFill,
  PiHouseLineFill,
  PiFireTruckFill,
  PiBoatFill,
  PiNutFill,
  PiLifebuoyBold,
} from "react-icons/pi";
import { TbSettings } from "react-icons/tb";

import {
  Home,
  Send,
  Truck,
  FileText,
  CheckCircle,
  MessageCircle,
  CreditCard,
  User,
  LifeBuoy,
  Settings,
  LogOut,
  ChevronDown,
} from "lucide-react"


export const sidebarLinks = [
  {
    id: 1,
    title: "Home",
    url: "/dashboard",
    icon: Home,
  },
  {
    id: 2,
    title: "Create Shipment",
    url: "/dashboard/bid",
    icon: Send,
  },
  {
    id: 3,
    title: "Shipment History",
    url: "/dashboard/shipment-history",
    icon: Truck,
  },
  {
    id: 4,
    title: "Quotes & Bids",
    url: "/dashboard/quote-bid",
    icon: FileText,
    // dropdownItems: [
    //   { name: "Active Request", path: "/send-package/active-request" },
    //   { name: "Upcoming Booking", path: "/send-package/upcoming-booking" },
    //   { name: "Request New Quote", path: "/send-package/new-quote" },
    // ],
  },
  {
    id: 5,
    title: "Accepted Transporters",
    url: "/dashboard/transporters",
    icon: CheckCircle,
  },
  {
    id: 6,
    title: "Messages",
    url: "/dashboard/messages",
    icon: MessageCircle,
  },
  {
    id: 7,
    title: "Payment & Transaction",
    url: "#",
    icon: CreditCard,
    dropdownItems: [
      { name: "	Payment History", path: "/dashboard/payment-history" },
      { name: "	Manage Payment", path: "/dashboard/manage-payment" },
    ],

  },
  {
    id: 8,
    title: "Profile",
    url: "/dashboard/profile",
    icon: User,
  },
  {
    id: 9,
    title: "Support",
    url: "/dashboard/support",
    icon: LifeBuoy,
  },
  {
    id: 10,
    title: "Settings",
    url: "/dashboard/settings",
    icon: Settings,
  },
];

export const settings = [
  {
    id: 1,
    title: "Support",
    icon: PiLifebuoyBold,
    path: "/support",
  },
  {
    id: 2,
    title: "Settings",
    icon: TbSettings,
    path: "/settings",
  },
];

export const transportation = [
  {
    id: 1,
    icons: PiMotorcycleFill,
    name: "Motorcycles",
    path: "/dashboard/send-package",
  },
  {
    id: 2,
    icons: PiCarFill,
    name: "Cars",
    path: "/dashboard/send-package",
  },
  {
    id: 3,
    icons: PiVanFill,
    name: "Mini-Van",
    path: "/dashboard/send-package",
  },
  {
    id: 4,
    icons: PiTruckFill,
    name: "Truck",
    path: "/dashboard/send-package",
  },
];

export const choose = [
  {
    id: 1,
    icons: PiAirplaneTiltLight,
    heading: "Swift and Effortless",
    text: "Need assistance? Email or call us. We are here to help.",
  },
  {
    id: 2,
    icons: PiReceiptLight,
    heading: "Affordable",
    text: "Save on delivery costs by comparing multiple quotes",
  },
  {
    id: 3,
    icons: PiTruckLight,
    heading: "Trusted Network",
    text: "Work only with verified transport providers with proven records",
  },
  {
    id: 4,
    icons: PiPackage,
    heading: "Eco-Friendly Options",
    text: "Help reduce carbon footprint by using empty vehicle space",
  },
];

export const steps = [
  {
    id: 1,
    heading: "Post Your Job",
    text: "Enter your delivery details in just a few clicks.",
  },
  {
    id: 2,
    heading: "Receive Quotes",
    text: "Our network of transport providers will send you their best bids.",
  },
  {
    id: 3,
    heading: "Choose Your Provider",
    text: "Select a provider based on price, reviews, and availability.",
  },
  {
    id: 4,
    heading: "Relax While We Handle It",
    text: "Track your delivery, and enjoy peace of mind with trusted support",
  },
];

export const service = [
  {
    id: 1,
    icons: PiCouchFill,
    text: "Furniture",
  },
  {
    id: 2,
    icons: PiPackage,
    text: "Boxes",
  },
  {
    id: 3,
    icons: PiCarFill,
    text: "Cars",
  },
  {
    id: 4,
    icons: PiMotorcycleFill,
    text: "Motorcycles",
  },
  {
    id: 5,
    icons: PiTractorFill,
    text: "Other Vehicles",
  },
  {
    id: 6,
    icons: PiHouseLineFill,
    text: "Moving Home",
  },
  {
    id: 7,
    icons: PiFireTruckFill,
    text: "Haulage",
  },
  {
    id: 8,
    icons: PiBoatFill,
    text: "Boats",
  },
  {
    id: 9,
    icons: PiNutFill,
    text: "Vehicle Parts",
  },
  {
    id: 10,
    icons: PiPianoKeysFill,
    text: "Pianos",
  },
  {
    id: 11,
    icons: PiPawPrintFill,
    text: "Pets & Livestock",
  },
  {
    id: 12,
    icons: PiSealQuestionFill,
    text: "Others",
  },
];

export const recentDelivery = [
  {
    id: 1,
    icons: PiCouchFill,
    text: "Furniture",
  },
  {
    id: 2,
    icons: PiPackage,
    text: "Boxes",
  },
  {
    id: 3,
    icons: PiCarFill,
    text: "Cars",
  },
  {
    id: 4,
    icons: PiMotorcycleFill,
    text: "Motorcycles",
  },
  {
    id: 5,
    icons: PiTractorFill,
    text: "Other Vehicles",
  },
  {
    id: 6,
    icons: PiHouseLineFill,
    text: "Moving Home",
  },
  {
    id: 7,
    icons: PiFireTruckFill,
    text: "Haulage",
  },
  {
    id: 8,
    icons: PiBoatFill,
    text: "Boats",
  },
  {
    id: 9,
    icons: PiNutFill,
    text: "Vehicle Parts",
  },
  {
    id: 10,
    icons: PiPianoKeysFill,
    text: "Pianos",
  },
  {
    id: 11,
    icons: PiPawPrintFill,
    text: "Pets & Livestock",
  },
  {
    id: 12,
    icons: PiSealQuestionFill,
    text: "Others",
  },
];

export const faqs = [
  {
    id: 1,
    question: "When Will I Receive a Quote?",
    answer:
      "You’ll typically start receiving quotes within 30 minutes. If quotes are delayed, consider adding more detail to your listing, as providers might need clarity on dimensions or weight. For urgent deliveries, try our 'Featured Delivery' option, which gives your listing priority visibility.",
  },
  {
    id: 2,
    question: "Who Will Handle My Delivery?",
    answer:
      "You decide! VuBids features a wide selection of rated transport providers ready to bid on your delivery. Simply choose the quote that best fits your needs.",
  },
  {
    id: 3,
    question: "How Can I Contact VuBids Support?",
    answer:
      "VuBids Support is available Monday through Friday, 9 am - 6 pm. Feel free to email us anytime, and we’ll assist you as quickly as possible.",
  },
  {
    id: 4,
    question: "Does VuBids Cover My Area?",
    answer:
      "Yes! VuBids has transport providers across the country and internationally, so whether you’re moving a sofa locally or shipping a vehicle across borders, we’ve got you covered.",
  },
  {
    id: 5,
    question: "Does VuBids Have Different Sized Vehicles?",
    answer:
      "Absolutely. VuBids connects you with a variety of transport providers with vehicles of all sizes. By providing dimensions and, if possible, photos with your listing, the right vehicle can be matched to your job.",
  },
];

export const transportSidebarLinks = [
  {
    id: 1,
    title: "Dashboard",
    icon: FiHome,
    path: "/transport-dashboard",
    dropdownItems: [
      {
        icon: PiTruckBold,
        name: "Current Quotes",
        path: "",
        notification: 10,
      },
      {
        icon: PiGavelBold,
        name: "Outbid Auction",
        path: "/transport-dashboard/bidding",
        notification: 3,
      },
      {
        icon: PiCheckCircleBold,
        name: "Accepted Quotes",
        path: "",
        notification: 4,
      },
      {
        icon: PiThumbsUpBold,
        name: "Completed Quotes",
        path: "/",
        notification: 32,
      },
      {
        icon: PiXCircleBold,
        name: "Unsuccessful Quotess",
        path: "",
        notification: 2,
      },
    ],
  },
  {
    id: 2,
    title: "Deliveries I'm Watching",
    icon: FiFlag,
    path: "/transport-dashboard/deliveries",
  },
  {
    id: 3,
    title: "Saved Searches",
    icon: FiLayers,
    path: "",
  },
  {
    id: 4,
    title: "Messages",
    icon: FiUsers,
    path: "",
  },
  {
    id: 5,
    title: "Feedback",
    icon: FiUsers,
    path: "",
  },
  {
    id: 6,
    title: "Profile",
    icon: FiUsers,
    path: "",
  },
];

export const deliveryHistory = [
  {
    id: 1,
    item: "Chair",
    pickupLococation: "Abule Egba, Lagos",
    deliveryLococation: "Sango, Ogun",
    date: "2024-09-24",
    time: "10 hours 59 mins",
    miles: "5km",
    price: "₦1,500",
    bidding: "14",
  },
  {
    id: 2,
    item: "Car Part",
    pickupLococation: "Lekki, Lagos",
    deliveryLococation: "Ajah, Lagos",
    date: "2024-09-22",
    time: "10 hours 59 mins",
    miles: "5km",
    price: "₦3,000",
    bidding: "0",
  },
  {
    id: 3,
    item: "Mercedes-Benz",
    pickupLococation: "Oshodi, Lagos",
    deliveryLococation: "Berger, Lagos",
    date: "2024-09-21",
    time: "10 hours 59 mins",
    miles: "5km",
    price: "₦1,000",
    bidding: "23",
  },
  {
    id: 4,
    item: "Bed",
    pickupLococation: "Ifo, Ogun",
    deliveryLococation: "Ijaye, Lagos",
    date: "22024-09-20",
    time: "10 hours 59 mins",
    miles: "5km",
    price: "₦1,200",
    bidding: "15",
  },
  {
    id: 5,
    item: "Table",
    pickupLococation: "CMS, Lagos",
    deliveryLococation: "Adeniyi Jones, Lagos",
    date: "2024-09-19",
    time: "10 hours 59 mins",
    miles: "5km",
    price: "₦3,500",
    bidding: "12",
  },
];

export const stats = [
  {
    title: "Current Quotes",
    value: "10",
    change: "40%",
    textColor: "#027A48",
    iconColor: "#12B76A",
    bgColor: "#D9F7E7",
  },
  {
    title: "Outbid Auction",
    value: "3",
    change: "21%",
    textColor: "#FFB800",
    iconColor: "#FFB800",
    bgColor: "#FFE3AC",
  },
  {
    title: "Accepted Quotes",
    value: "4",
    change: "85%",
    textColor: "#027A48",
    iconColor: "#12B76A",
    bgColor: "#D9F7E7",
  },
  {
    title: "Completed Quotes",
    value: "32",
    change: "15%",
    textColor: "#027A48",
    iconColor: "#12B76A",
    bgColor: "#D9F7E7",
  },
];

export const data = [
  { month: "Jan", Shipment: 6000, Delivery: 7000 },
  { month: "Feb", Shipment: 7500, Delivery: 8000 },
  { month: "Mar", Shipment: 4500, Delivery: 5000 },
  { month: "Apr", Shipment: 7000, Delivery: 7500 },
  { month: "May", Shipment: 4000, Delivery: 6000 },
  { month: "Jun", Shipment: 5000, Delivery: 7000 },
  { month: "Jul", Shipment: 4000, Delivery: 6500 },
];

export const MOCK_QUOTES = [
  {
    id: "1",
    customer: "Adewale Michael",
    from: "Oshodi",
    to: "Lekki",
    item: {
      name: "TV Set 43inch",
      description: "Electronics",
    },

    status: "completed",
    statuss: "Delivered",
  },
  {
    id: "2",
    customer: "Johnson Oguntobi",
    from: "Abule Egba",
    to: "Sango",
    item: {
      name: "Furniture",
      description: "Home",
    },
    status: "in-transit",
    statuss: "In-transit",
  },
  {
    id: "3",
    customer: "Qaudri Sumonu",
    from: "Ogba",
    to: "Berger",
    item: {
      name: "iPhone",
      description: "Electronics",
    },
    status: "pending",
    statuss: "Pending",
  },
];

export const shipments = [
  {
    id: "001",
    customerName: "Adewale Michael",
    shippingDate: "2024-09-24",
    route: {
      from: "Abule Egba, Lagos",
      to: "Sango, Ogun",
    },
    price: 1500,
    status: "bid",
  },
  {
    id: "002",
    customerName: "Johnson Oguntobi",
    shippingDate: "2024-09-22",
    route: {
      from: "Lekki, Lagos",
      to: "Ajah, Lagos",
    },
    price: 3000,
    status: "pending",
  },
  {
    id: "003",
    customerName: "Qaudri Sumonu",
    shippingDate: "2024-09-21",
    route: {
      from: "Oshodi, Lagos",
      to: "Berger, Lagos",
    },
    price: 1000,
    status: "transit",
  },
  {
    id: "004",
    customerName: "Adewale Michael",
    shippingDate: "2024-09-20",
    route: {
      from: "Ifo, Ogun",
      to: "Ijaye, Lagos",
    },
    price: 200,
    status: "transit",
  },
  {
    id: "005",
    customerName: "Johnson Oguntobi",
    shippingDate: "2024-09-19",
    route: {
      from: "CMS, Lagos",
      to: "Adeniyi Jones, Lagos",
    },
    price: 3500,
    status: "delivered",
  },
  {
    id: "006",
    customerName: "Qaudri Sumonu",
    shippingDate: "2024-09-18",
    route: {
      from: "Berger, Lagos",
      to: "Ogba, Lagos",
    },
    price: 2500,
    status: "delivered",
  },
];

export const mockQuotes = [
  { amount: 1500, provider: 'GIG Logistics' },
  { amount: 5500, provider: 'Kwick Logistic' },
  { amount: 2500, provider: 'Go_Kada Logistics' },
  { amount: 3000, provider: 'GetFast' },
  { amount: 1800, provider: 'Montero Lingua.co' },
  { amount: 1200, provider: 'Baba Basit & Co' },
];

export const mockQuestions = [
  {
    provider: 'Gokada',
    time: '5mins ago',
    message: 'Hello there , when is this vehicle ready to be transported?'
  },
  {
    provider: 'Baba lati & Co',
    time: '7mins ago',
    message: 'Shey eru yen por gan abi o kere'
  },
  {
    provider: 'Emeka & Sons Transport',
    time: '5mins ago',
    message: 'How far, how the load be sef, shey nah wetin one person fit carry'
  }
];

export const deliveries = [
  {
    id: "001",
    customerName: "Adewale Michael",
    estDelivery: "2024-09-24",
    pickupDelivery: "Agbado/Sango",
    price: 1500,
    status: "bid",
  },
  {
    id: "002",
    customerName: "Johnson Oguntobi",
    estDelivery: "2024-09-22",
    pickupDelivery: "Ifo/Sango",
    price: 3000,
    status: "pending",
  },
  {
    id: "003",
    customerName: "Qaudri Sumonu",
    estDelivery: "2024-09-21",
    pickupDelivery: "Berger/Lekki",
    price: 1000,
    status: "transit",
  },
  {
    id: "004",
    customerName: "Adewale Michael",
    estDelivery: "2024-09-20",
    pickupDelivery: "Lekki/Ajah",
    price: 2000,
    status: "transit",
  },
  {
    id: "005",
    customerName: "Johnson Oguntobi",
    estDelivery: "2024-09-19",
    pickupDelivery: "VGC/Ikoyi",
    price: 3500,
    status: "delivered",
  },
  {
    id: "006",
    customerName: "Qaudri Sumonu",
    estDelivery: "2024-09-18",
    pickupDelivery: "Dalemo/Kola",
    price: 2500,
    status: "delivered",
  },
];

export const ServicesForYou = [
  {
    id: 1,
    heading: "Send Package",
    text: "Request Pick Up, Delivery",
  },
  {
    id: 2,
    heading: "Moving Service",
    text: "Need assistance moving to your new home",
  },
  {
    id: 3,
    heading: "Get quick Quote",
    text: "Need assistance moving to your new home",
  },
];
