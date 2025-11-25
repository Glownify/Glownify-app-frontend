import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'; // i  use native-vector-icons/Ionicons

const colors = {
    primary: '#156778',
    primaryLight: '#E1F5FA',
    white: '#FFFFFF',
    textSecondary: '#6B7280',
    background: '#FFFFFF',
    success: '#059669', // For rating
    border: '#E5E7EB',
};

// Define a default professional object for demonstration/placeholder
const defaultProfessional = {
    _id: 'prof1',
    profileImage: { uri: 'https://appointible.com/wp-content/uploads/2023/02/hair-stylist-cutting-hair-1024x683.jpeg.webp' }, // Placeholder image
    name: 'Maya Sharma',
    address: 'Banjara Hills, Hyd.',
    experience: '8 Years',
    servicesType: 'Hair, Skincare & Makeup',
    gender: 'Female',
    rating: 4.9,
};

const ServiceAtHomeCard = ({ professional = defaultProfessional, onPress }) => {
    const { profileImage, name, address, experience, servicesType, gender, rating } = professional;

    return (
        <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
            <View style={styles.content}>
                {/* Left Section: Image and Rating */}
                <View style={styles.imageContainer}>
                    <Image source={profileImage} style={styles.profileImage} />
                    {/* Rating Badge */}
                    <View style={styles.ratingBadge}>
                        <Ionicons name="star" size={10} color={colors.white} />
                        <Text style={styles.ratingText}>{rating}</Text>
                    </View>
                </View>

                {/* Right Section: Details */}
                <View style={styles.detailsContainer}>
                    <Text style={styles.name} numberOfLines={1}>{name}</Text>
                    
                    {/* Location */}
                    <View style={styles.detailRow}>
                        <Ionicons name="location-outline" size={14} color={colors.textSecondary} />
                        <Text style={styles.detailText} numberOfLines={1}>{address}</Text>
                    </View>

                    {/* Experience */}
                    <View style={styles.detailRow}>
                        <Ionicons name="briefcase-outline" size={14} color={colors.textSecondary} />
                        <Text style={styles.detailText}>{experience} Exp.</Text>
                    </View>

                    {/* Services Type */}
                    <View style={styles.detailRow}>
                        <Ionicons name="cut-outline" size={14} color={colors.textSecondary} />
                        <Text style={styles.detailText} numberOfLines={1}>{servicesType}</Text>
                    </View>
                    
                    {/* Gender */}
                    <View style={styles.detailRow}>
                        <Ionicons 
                            name={gender === 'Male' ? "male-outline" : "female-outline"} 
                            size={14} 
                            color={colors.textSecondary} 
                        />
                        <Text style={styles.detailText}>{gender}</Text>
                    </View>
                </View>
            </View>
            
            {/* Action Button/Indicator */}
            <View style={styles.actionArrow}>
                <Ionicons name="chevron-forward" size={24} color={colors.primary} />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: colors.white,
        borderRadius: 12,
        marginHorizontal: 16,
        marginBottom: 16,
        padding: 12,
        borderWidth: 1,
        borderColor: colors.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.08,
        shadowRadius: 3,
        elevation: 2,
        alignItems: 'center',
    },
    content: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    imageContainer: {
        marginRight: 12,
    },
    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: colors.primaryLight,
        resizeMode: 'cover',
    },
    ratingBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.success,
        borderRadius: 10,
        paddingHorizontal: 6,
        paddingVertical: 2,
    },
    ratingText: {
        color: colors.white,
        fontSize: 10,
        fontWeight: 'bold',
        marginLeft: 2,
    },
    detailsContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: 4,
    },
    detailRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 2,
    },
    detailText: {
        fontSize: 13,
        color: colors.textSecondary,
        marginLeft: 6,
        flexShrink: 1, // Allows text to wrap/truncate
    },
    actionArrow: {
        marginLeft: 10,
        alignSelf: 'center',
    }
});

export default ServiceAtHomeCard;