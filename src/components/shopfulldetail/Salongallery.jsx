// components/shopfulldetail/Salongallery.jsx
import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Two prominent images side-by-side, then horizontal scroll of the rest
export default function SalonGallery({ images = [] }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  if (!images || images.length === 0) return null;

  const heroImages = images.slice(0, 2);
  const remainingImages = images.slice(2);

  const openLightbox = idx => setLightboxIndex(idx);
  const closeLightbox = () => setLightboxIndex(null);

  return (
    <View>
      {/* Section header */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Gallery</Text>
        <Text style={styles.sectionCount}>{images.length} photos</Text>
      </View>
      <View className='rounded-2xl border-t-2 border-t-pink-500 border border-slate-100 shadow-sm elevation-3' style={styles.container}>
        {/* Hero row: 2 prominent images */}
        <View style={styles.heroRow}>
          {heroImages.map((uri, idx) => (
            <TouchableOpacity
              key={idx}
              style={styles.heroItem}
              onPress={() => openLightbox(idx)}
              activeOpacity={0.88}
            >
              <Image source={{ uri }} style={styles.heroImage} />
              <View style={styles.heroOverlay} />
              {idx === 0 && (
                <View style={styles.heroBadge}>
                  <Text style={styles.heroBadgeText}>Featured</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* Remaining images: horizontal scroll */}
        {remainingImages.length > 0 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollRow}
            style={styles.scrollContainer}
          >
            {remainingImages.map((uri, idx) => (
              <TouchableOpacity
                key={idx + 2}
                style={styles.thumbItem}
                onPress={() => openLightbox(idx + 2)}
                activeOpacity={0.85}
              >
                <Image source={{ uri }} style={styles.thumbImage} />
                {/* If last item and there are "more" images hidden, show overlay */}
                {idx === remainingImages.length - 1 && images.length > 8 && (
                  <View style={styles.moreOverlay}>
                    <Text style={styles.moreText}>+{images.length - 8}</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}

        {/* Lightbox modal */}
        <Modal
          visible={lightboxIndex !== null}
          transparent
          animationType="fade"
          onRequestClose={closeLightbox}
          statusBarTranslucent
        >
          <View style={styles.lightbox}>
            <Pressable
              style={styles.lightboxBackdrop}
              onPress={closeLightbox}
            />

            {/* Image */}
            {lightboxIndex !== null && (
              <View style={styles.lightboxContent}>
                <Image
                  source={{ uri: images[lightboxIndex] }}
                  style={styles.lightboxImage}
                  resizeMode="contain"
                />
                {/* Counter */}
                <View style={styles.lightboxCounter}>
                  <Text style={styles.lightboxCounterText}>
                    {lightboxIndex + 1} / {images.length}
                  </Text>
                </View>
                {/* Nav arrows */}
                {lightboxIndex > 0 && (
                  <TouchableOpacity
                    style={[styles.navBtn, styles.navBtnLeft]}
                    onPress={() => setLightboxIndex(i => i - 1)}
                  >
                    <Text style={styles.navBtnText}>‹</Text>
                  </TouchableOpacity>
                )}
                {lightboxIndex < images.length - 1 && (
                  <TouchableOpacity
                    style={[styles.navBtn, styles.navBtnRight]}
                    onPress={() => setLightboxIndex(i => i + 1)}
                  >
                    <Text style={styles.navBtnText}>›</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}

            {/* Close button */}
            <TouchableOpacity
              style={styles.lightboxClose}
              onPress={closeLightbox}
            >
              <Text style={styles.lightboxCloseText}>✕</Text>
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const HERO_IMG_WIDTH = (SCREEN_WIDTH - 32 - 8) / 2; // 16px padding each side + 8px gap
const HERO_IMG_HEIGHT = HERO_IMG_WIDTH * 1.1;
const THUMB_SIZE = 88;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 14,
    // marginBottom: 8,
    backgroundColor: '#FFF',
    paddingVertical: 12,
    // borderRadius: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2D1B1A',
    letterSpacing: -0.2,
  },
  sectionCount: {
    fontSize: 13,
    color: '#9B6E6A',
    fontWeight: '500',
  },
  heroRow: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  heroItem: {
    flex: 1,
    borderRadius: 16,
    overflow: 'hidden',
    height: HERO_IMG_HEIGHT,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(45,27,26,0.08)',
  },
  heroBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(196,96,90,0.9)',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  heroBadgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.4,
  },
  scrollContainer: {
    paddingLeft: 16,
  },
  scrollRow: {
    paddingRight: 16,
    gap: 8,
    alignItems: 'center',
  },
  thumbItem: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: 12,
    overflow: 'hidden',
  },
  thumbImage: {
    width: '100%',
    height: '100%',
  },
  moreOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(45,27,26,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  moreText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },
  // Lightbox
  lightbox: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.92)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lightboxBackdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  lightboxContent: {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT * 0.75,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lightboxImage: {
    width: SCREEN_WIDTH - 32,
    height: '100%',
    borderRadius: 16,
  },
  lightboxCounter: {
    position: 'absolute',
    bottom: -28,
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 4,
  },
  lightboxCounterText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },
  navBtn: {
    position: 'absolute',
    top: '50%',
    marginTop: -24,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navBtnLeft: { left: 8 },
  navBtnRight: { right: 8 },
  navBtnText: {
    color: '#fff',
    fontSize: 32,
    lineHeight: 36,
    fontWeight: '300',
  },
  lightboxClose: {
    position: 'absolute',
    top: 52,
    right: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  lightboxCloseText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
