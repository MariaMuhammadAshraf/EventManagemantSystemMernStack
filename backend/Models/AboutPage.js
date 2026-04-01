
import mongoose from "mongoose";

const featureSchema = new mongoose.Schema({
  iconUrl: { type: String, default: "" },
  title: { type: String, default: "" },
  description: { type: String, default: "" },
});

const featuresSchema = new mongoose.Schema({
  heading: { type: String, default: "Our Features" },
  items: { type: [featureSchema], default: [] },
});

const aboutPageSchema = new mongoose.Schema(
  {
    hero: {
      title: { type: String, default: "About" },
      highlight: { type: String, default: "EventSphere" },
      description: {
        type: String,
        default:
          "EventSphere Management is a leading platform that transforms the way expos and trade shows are organized, experienced, and analyzed. Our mission is to make event management seamless, interactive, and data-driven.",
      },
      backgroundImageUrl: {
        type: String,
        default:
          "https://economymiddleeast.com/wp-content/uploads/2025/11/whx-in-dubai-1-1200x675.jpg",
      },
    },
    mission: {
      title: { type: String, default: "Our Mission" },
      description: {
        type: String,
        default:
          "To empower organizers, exhibitors, and attendees with advanced technology, making every expo engaging, organized, and data-driven.",
      },
      imageUrl: {
        type: String,
        default:
          "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1600&q=100",
      },
    },
    vision: {
      title: { type: String, default: "Our Vision" },
      description: {
        type: String,
        default:
          "To become the world's most trusted platform for expo management, bridging innovation and human connection across industries.",
      },
      imageUrl: {
        type: String,
        default:
          "https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1600&q=100",
      },
    },
    features: {
      type: featuresSchema,
      default: () => ({
        heading: "Our Features",
        items: [
          {
            iconUrl: "https://cdn-icons-png.flaticon.com/512/906/906334.png",
            title: "Smart Expo Management",
            description:
              "From registrations to booth allocation and schedule management, everything is handled inside one powerful dashboard.",
          },
          {
            iconUrl: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png",
            title: "Real-Time Analytics",
            description:
              "Track attendee engagement, session popularity, and booth traffic with beautiful real-time insights.",
          },
          {
            iconUrl: "https://cdn-icons-png.flaticon.com/512/747/747376.png",
            title: "Exhibitor & Attendee Tools",
            description:
              "Exhibitors showcase products, attendees connect easily, and everyone enjoys a seamless experience.",
          },
        ],
      }),
    },
    cta: {
      title: { type: String, default: "Ready to experience" },
      highlight: { type: String, default: "smarter expos?" },
      description: {
        type: String,
        default:
          "Join EventSphere today and transform the way you organize and attend expos with modern, intelligent tools.",
      },
      buttonText: { type: String, default: "Get Started 🚀" },
      buttonLink: { type: String, default: "/signup" },
    },
  },
  { timestamps: true }
);

const AboutPage = mongoose.model("AboutPage", aboutPageSchema);

export default AboutPage;
