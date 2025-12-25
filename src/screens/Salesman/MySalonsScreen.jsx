import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const STATUS_COLORS = {
  ACTIVE: '#22C55E',
  INACTIVE: '#EF4444',
  PENDING: '#FACC15',
};

const SALONS = [
  {
    id: 1,
    name: 'Velvet Cut Salon & Spa',
    owner: 'Sarah Jenkins',
    address: '123 Fashion Street, Downtown',
    joined: 'Oct 12, 2023',
    commission: '$450.00',
    image: 'https://images.unsplash.com/photo-1600948836101-f9ffda59d250',
    status: 'ACTIVE',
  },
  {
    id: 2,
    name: 'Glow & Grace Beauty Studio',
    owner: 'Emily Watson',
    address: '45 Rose Avenue, Midtown',
    joined: 'Jan 5, 2024',
    commission: '$320.00',
    image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9',
    status: 'PENDING',
  },
  {
    id: 3,
    name: 'Urban Edge Salon',
    owner: 'Michael Brown',
    address: '88 Market Road, City Center',
    joined: 'Aug 20, 2023',
    commission: '$275.50',
    image: 'https://images.unsplash.com/photo-1500840216050-6ffa99d75160',
    status: 'INACTIVE',
  },
  {
    id: 4,
    name: 'Luxe Locks Hair Lounge',
    owner: 'Olivia Martin',
    address: '12 Palm Street, West End',
    joined: 'Nov 2, 2023',
    commission: '$610.00',
    image: 'https://images.unsplash.com/photo-1559599101-f09722fb4948',
    status: 'ACTIVE',
  },
];

export default function MySalonsScreen({ navigation }) {
  //   const salon = {
  //     name: 'Velvet Cut Salon & Spa',
  //     owner: 'Sarah Jenkins',
  //     address: '123 Fashion Street, Downtown',
  //     joined: 'Oct 12, 2023',
  //     commission: '$450.00',
  //     image:
  //       'https://images.unsplash.com/photo-1600948836101-f9ffda59d250',
  //     status: 'ACTIVE',
  //   };

  return (
    <View style={styles.container}>
      {/* --- Header --- */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Saloons</Text>
        {/* This button lets you close the modal */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-down-outline" size={28} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: 90 }}
        showsVerticalScrollIndicator={false}
      >
        {SALONS.map(salon => (
          <View style={styles.card} key={salon.id}>
            {/* Image Section */}
            <View>
              <Image source={{ uri: salon.image }} style={styles.image} />
              <View
                style={[
                  styles.statusBadge,
                  salon.status === 'ACTIVE'
                    ? { backgroundColor: STATUS_COLORS.ACTIVE }
                    : salon.status === 'INACTIVE'
                    ? { backgroundColor: STATUS_COLORS.INACTIVE }
                    : salon.status === 'PENDING'
                    ? { backgroundColor: STATUS_COLORS.PENDING }
                    : {},
                ]}
              >
                <Text style={styles.statusText}>{salon.status}</Text>
              </View>
            </View>

            {/* Content */}
            <View style={styles.content}>
              <Text style={styles.title}>{salon.name}</Text>

              <View style={styles.row}>
                <Icon name="person-outline" size={14} color="#6B7280" />
                <Text style={styles.info}>Owner: {salon.owner}</Text>
              </View>

              <View style={styles.row}>
                <Icon name="location-outline" size={14} color="#6B7280" />
                <Text style={styles.info}>{salon.address}</Text>
              </View>

              <View style={styles.row}>
                <Icon name="calendar-outline" size={14} color="#6B7280" />
                <Text style={styles.info}>Joined: {salon.joined}</Text>
              </View>

              {/* Commission */}
              <View style={styles.commissionBox}>
                <Text style={styles.commissionLabel}>TOTAL COMMISSION</Text>
                <Text style={styles.commissionValue}>{salon.commission}</Text>
              </View>

              {/* Actions */}
              <View style={styles.actionRow}>
                <TouchableOpacity style={styles.detailsButton}>
                  <Text style={styles.detailsText}>View Details</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconButton}>
                  <Icon name="call-outline" size={18} color="#111827" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconButton}>
                  <Icon name="chatbubble-outline" size={18} color="#111827" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    marginVertical: 15,
    // backgroundColor: '#FFFFFF', // White header background
    marginHorizontal: -20, // Extend to screen edges
    paddingHorizontal: 20, // Re-apply padding
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600', // Semi-bold
    color: '#111111',
  },
  container: {
    padding: 16,
    backgroundColor: '#F9FAFB',
  },
  heading: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  subHeading: {
    fontSize: 13,
    color: '#6B7280',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 160,
  },
  statusBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    // backgroundColor: '#22C55E',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '600',
  },
  content: {
    padding: 14,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  info: {
    marginLeft: 6,
    fontSize: 13,
    color: '#6B7280',
  },
  commissionBox: {
    backgroundColor: '#F1F5F9',
    padding: 10,
    borderRadius: 10,
    marginTop: 12,
  },
  commissionLabel: {
    fontSize: 11,
    color: '#6B7280',
  },
  commissionValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2563EB',
    marginTop: 2,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 14,
  },
  detailsButton: {
    flex: 1,
    backgroundColor: '#111827',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
  },
  detailsText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  iconButton: {
    marginLeft: 10,
    padding: 12,
    backgroundColor: '#F3F4F6',
    borderRadius: 10,
  },
});
