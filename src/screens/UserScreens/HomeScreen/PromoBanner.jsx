import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

// --- Color Palette ---
const Colors = {
  primary: "#5E38A8",
  secondary: "#C0B3E0",
  textPrimary: "#1F2937",
  textSecondary: "#6B7280",
  white: "#FFC7A8",
  white: "#FFFFFF",
  cardBackground: "#FAFAFA",
};

// --- Icon Box ---
const StepIcon = ({ iconChar }) => (
  <View style={styles.stepIcon}>
    <Text style={styles.stepIconText}>{iconChar}</Text>
  </View>
);

// --- Salon Card ---
const SalonCard = ({ title, location, rating, count, price }) => (
  <View style={styles.salonCard}>
    <View style={styles.cardImage}>
      <Text style={{ fontSize: 20 }}>🖼️</Text>
    </View>

    <View style={{ flex: 1 }}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardLocation}>{location}</Text>

      <View style={styles.ratingRow}>
        <Text style={styles.star}>★</Text>
        <Text style={styles.ratingText}>{rating}</Text>
        <Text style={styles.separator}>|</Text>
        <Text style={styles.countText}>{count}</Text>
      </View>

      <View style={styles.priceRow}>
        <Text style={styles.price}>₹{price}</Text>
        <Text style={styles.orText}>or</Text>
      </View>
    </View>
  </View>
);

// --- Phone Mockup ---
const PhoneMockup = () => (
  <View style={styles.phoneWrapper}>
    <View style={styles.notchRow}>
      {/* <Text style={styles.timeText}>8:41</Text> */}
    </View>

    <View style={styles.headerRow}>
      <View style={styles.circleIcon}>
        <Text>🔍</Text>
      </View>

      <Text style={styles.menuIcon}>≡</Text>
    </View>

    <Text style={styles.screenTitle}>Book a Salon Visit</Text>

    <ScrollView style={styles.listScroll}>
      <SalonCard title="Glow Up Studio" location="Khar" rating="4.8" count="625" price="1500" />
      <SalonCard title="Stylista" location="Bandra" rating="4.8" count="202" price="2000" />
      {/* <SalonCard title="Salon 360" location="Andheri" rating="4.7" count="88" price="1300" /> */}
      {/* <SalonCard title="Urban Bliss" location="Juhu" rating="4.6" count="412" price="1850" /> */}
      {/* <SalonCard title="Hair & Beyond" location="Colaba" rating="4.9" count="780" price="2200" /> */}

      <View style={{ height: 40 }} />
    </ScrollView>
  </View>
);

// --- Steps Section ---
const StepItem = ({ step, title, description, iconChar, isLast }) => (
  <View style={styles.stepItem}>
    <View style={{ alignItems: "center", marginRight: 20 }}>
      <StepIcon iconChar={iconChar} />
      {!isLast && <View style={styles.verticalLine} />}
    </View>

    <View style={{ flex: 1 }}>
      <Text style={styles.stepTitle}>
        <Text style={styles.stepNumber}>Step {step} </Text>
        {title}
      </Text>
      <Text style={styles.stepDescription}>{description}</Text>
    </View>
  </View>
);

export default function PromoBanner() {
  return (
    <ScrollView contentContainerStyle={styles.mainWrapper}>
      <Text style={styles.mainHeader}>
        Book Your Salon Appointment in 3 Easy Steps
      </Text>

      <View style={styles.container}>
        {/* Steps Section */}
        <View style={styles.leftBlock}>
          <StepItem
            step={1}
            title="Choose Your Salon"
            description="Browse nearby salons and pick your favorite one."
            iconChar="🏬"
          />
          <StepItem
            step={2}
            title="Select Your Services"
            description="Haircut, grooming, facial & more."
            iconChar="✂️"
          />
          <StepItem
            step={3}
            title="Pick Date & Time + Confirm"
            description="Choose your slot & confirm instantly."
            iconChar="📅"
            isLast
          />
        </View>

        {/* Phone Mockup */}
        <View style={styles.rightBlock}>
          <PhoneMockup />
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerPoints}>
          • Fast Booking  • No Waiting  • Verified Salons
        </Text>
        {/* <Text style={styles.footerBrand}>💅 Glownify</Text> */}
      </View>
    </ScrollView>
  );
}

// ----------------------------------------------------------------------
// STYLESHEET
// ----------------------------------------------------------------------
const styles = StyleSheet.create({
  mainWrapper: {
    paddingVertical: 10,
    backgroundColor: Colors.white,
    alignItems: "center",
  },

  mainHeader: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.textPrimary,
    textAlign: "center",
    marginBottom: 20,
    // paddingHorizontal: 20,
  },

  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    paddingHorizontal: 15,
  },

  leftBlock: {
    width: "45%",
    paddingRight: 10,
  },

  rightBlock: {
    width: "50%",
    alignItems: "center",
  },

  stepItem: {
    flexDirection: "row",
    marginBottom: 20,
  },

  stepIcon: {
    width: 40,
    height: 40,
    borderRadius: 15,
    backgroundColor: Colors.secondary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    elevation: 5,
  },

  stepIconText: {
    fontSize: 18,
  },

  verticalLine: {
    width: 2,
    height: 30,
    backgroundColor: Colors.secondary,
  },

  stepTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.textPrimary,
    marginBottom: 5,
  },

  stepNumber: {
    color: Colors.primary,
    fontWeight: "700",
  },

  stepDescription: {
    color: Colors.textSecondary,
    fontSize: 10,
  },

  // ------------ Phone Mockup -----------------------
  phoneWrapper: {
    width: 150,
    height: 300,
    backgroundColor: Colors.white,
    borderWidth: 8,
    borderColor: "#333",
    borderRadius: 40,
    overflow: "hidden",
    padding: 8,
    elevation: 8,
  },

  notchRow: {
    alignItems: "center",
    marginBottom: 10,
  },

  timeText: {
    fontSize: 6,
    fontWeight: "700",
    color: "#333",
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    // marginBottom: 10,
  },

  circleIcon: {
    width: 20,
    height: 20,
    backgroundColor: "#eee",
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  menuIcon: {
    fontSize: 22,
    color: "#666",
  },

  screenTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: Colors.textPrimary,
    marginBottom: 10,
  },

  listScroll: {
    height: 430,
  },

  // --------- Salon Card ----------
  salonCard: {
    flexDirection: "row",
    padding: 6,
    marginBottom: 8,
    backgroundColor: Colors.cardBackground,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },

  cardImage: {
    width: 20,
    height: 20,
    backgroundColor: "#D8B4FE",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  cardTitle: {
    fontWeight: "700",
    fontSize: 10,
    color: Colors.textPrimary,
  },

  cardLocation: {
    fontSize: 8,
    color: Colors.textSecondary,
  },

  ratingRow: {
    flexDirection: "row",
    marginTop: 3,
    alignItems: "center",
  },

  star: { color: "gold", marginRight: 5 },
  ratingText: { fontWeight: "700", color: Colors.textPrimary },
  separator: { marginHorizontal: 5, color: Colors.textSecondary },
  countText: { color: Colors.textSecondary },

  priceRow: {
    flexDirection: "row",
    marginTop: 5,
    alignItems: "center",
  },

  price: {
    fontSize: 10,
    fontWeight: "700",
    color: Colors.primary,
    marginRight: 10,
  },

  orText: { color: Colors.textSecondary, fontSize: 10 },

  // ---------- Footer -----------
  footer: {
    marginTop: 10,
    alignItems: "center",
  },

  footerPoints: {
    color: Colors.textSecondary,
    fontSize: 14,
  },

  footerBrand: {
    fontSize: 18,
    fontWeight: "800",
    color: Colors.primary,
  },
});
