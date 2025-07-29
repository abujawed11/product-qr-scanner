import React, { useState } from 'react';
import {
  LayoutAnimation,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type SectionProps = {
  title: string;
  emoji: string;
  children: React.ReactNode;
  expanded: boolean;
  onToggle: () => void;
};

const ACCENT = "#FAD90E";
const BG = "#0B0B0E";
const FG = "#fff";

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Section: React.FC<SectionProps> = ({
  title,
  emoji,
  children,
  expanded,
  onToggle,
}) => (
  <View style={styles.sectionOuter}>
    <TouchableOpacity
      onPress={() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        onToggle();
      }}
      style={[
        styles.sectionTitleRow,
        expanded && { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }
      ]}
      activeOpacity={0.8}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, minHeight: 27 }}>
        <Text style={styles.sectionEmoji}>{emoji}</Text>
        <Text
          style={styles.sectionTitle}
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {title}
        </Text>
      </View>
      <Text style={[styles.dropIcon, expanded && { color: ACCENT }]}>{expanded ? "▲" : "▼"}</Text>
    </TouchableOpacity>
    {expanded && (
      <View style={styles.sectionContent}>
        {children}
      </View>
    )}
  </View>
);

const AboutScreen = () => {
  const [openSection, setOpenSection] = useState<number | null>(null);

  const sections: {
    title: string;
    emoji: string;
    content: React.ReactNode;
  }[] = [
    {
      title: 'About Sun-Rack Warranty Portal',
      emoji: '🔆',
      content: (
        <Text style={styles.contentText}>
          The <Text style={styles.bold}>Sun-Rack Warranty Portal</Text> is a streamlined digital platform designed for Sun-Rack Technologies clients to manage and secure the warranty of their solar module mounting solutions with maximum ease and transparency.
        </Text>
      )
    },
    {
      title: 'What We Offer',
      emoji: '✨',
      content: (
        <View>
          <Text style={styles.bullet}><Text style={styles.bold}>Seamless QR Experience</Text>: Simply scan the QR code provided with your Sun-Rack Technologies product to initiate a warranty request in seconds.</Text>
          <Text style={styles.bullet}><Text style={styles.bold}>Digital Warranty Card</Text>: Upon successful verification, your official warranty card is issued digitally: secure, paperless, and instantly accessible.</Text>
          <Text style={styles.bullet}><Text style={styles.bold}>24/7 Accessibility</Text>: Register and track your warranty status anytime, anywhere, without the hassle of paperwork or waiting periods.</Text>
          <Text style={styles.bullet}><Text style={styles.bold}>Customer-Focused Support</Text>: Dedicated support ensures your warranty queries and requests receive prompt attention.</Text>
        </View>
      ),
    },
    {
      title: 'Why Use the Sun-Rack Warranty Portal?',
      emoji: '❓',
      content: (
        <View>
          <Text style={styles.bullet}><Text style={styles.bold}>Easy Registration</Text>: Quick process designed for all users, streamlining the warranty claim and tracking experience.</Text>
          <Text style={styles.bullet}><Text style={styles.bold}>Convenience</Text>: Manage your solar structure warranties digitally, ensuring that all records are stored safely and are always just a click away.</Text>
          <Text style={styles.bullet}><Text style={styles.bold}>Transparency & Trust</Text>: Get clear terms, confirmation, and details of your warranty, building long-term trust with every Sun-Rack product.</Text>
        </View>
      ),
    },
    {
      title: 'About Sun-Rack Technologies',
      emoji: '🏢',
      content: (
        <View>
          <Text style={[styles.contentText, { marginBottom: 6 }]}>
            Founded in 2018, <Text style={styles.bold}>Sun-Rack Technologies</Text> is recognized as one of India’s leading manufacturers of solar module mounting structures. With a commitment to quality, innovation, and sustainability, Sun-Rack delivers:
          </Text>
          <View style={{ paddingLeft: 8 }}>
            <Text style={styles.bulletDash}>Easy-to-install structures</Text>
            <Text style={styles.bulletDash}>Designs suited for varied roof and ground conditions (including metal, RCC, and carport solutions)</Text>
            <Text style={styles.bulletDash}>Premium-grade aluminum (T6-6063) components</Text>
            <Text style={styles.bulletDash}>Wind-resilient engineering for up to 200kmph</Text>
          </View>
        </View>
      ),
    },
    {
      title: 'Our Vision',
      emoji: '🌅',
      content: (
        <Text style={styles.contentText}>
          With the <Text style={styles.bold}>Sun-Rack Warranty Portal</Text>, we aim to enhance the ownership experience, ensuring that every investment in clean energy with Sun-Rack is anchored in security, convenience, and trust.
        </Text>
      ),
    },
    {
      title: 'In a Nutshell',
      emoji: '🔎',
      content: (
        <Text style={styles.contentText}>
          This About section captures the digital innovation, customer advantages, and the reputable background of Sun-Rack Technologies, tailored for use on your new warranty portal.
        </Text>
      ),
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: BG }}>
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 40 }}>
        <Text style={styles.mainTitle}>
          🛡️ <Text style={{ color: ACCENT }}>About Sun-Rack Warranty Portal</Text>
        </Text>
        {sections.map((section, idx) => (
          <Section
            key={section.title}
            title={section.title}
            emoji={section.emoji}
            expanded={openSection === idx}
            onToggle={() => setOpenSection(openSection === idx ? null : idx)}
          >
            {section.content}
          </Section>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: "#fff",
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  sectionOuter: {
    marginBottom: 20,
    borderRadius: 14,
    backgroundColor: "#18181b",
    borderColor: ACCENT,
    borderWidth: 1.2,
    overflow: 'hidden',
    shadowColor: "#FAD90E",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: "#18181b",
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  sectionEmoji: {
    fontSize: 22,
    marginRight: 10,
  },
  sectionTitle: {
    color: ACCENT,
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: 0.2,
    flexShrink: 1,
    flexWrap: 'wrap',
  },
  dropIcon: {
    fontSize: 18,
    color: "#fff",
    marginLeft: 12,
  },
  sectionContent: {
    backgroundColor: "#191919",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderBottomLeftRadius: 14,
    borderBottomRightRadius: 14,
  },
  contentText: {
    color: FG,
    fontSize: 16,
    lineHeight: 23,
    marginBottom: 2,
  },
  bold: {
    fontWeight: 'bold',
    color: ACCENT,
  },
  bullet: {
    color: FG,
    fontSize: 16,
    lineHeight: 23,
    marginBottom: 6,
    marginLeft: 0,
  },
  bulletDash: {
    color: FG,
    fontSize: 16,
    marginBottom: 3,
    marginLeft: 10,
  },
});

export default AboutScreen;