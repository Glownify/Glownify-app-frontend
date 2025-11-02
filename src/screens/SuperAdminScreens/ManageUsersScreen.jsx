import React, { useEffect } from "react";
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllUsers } from "../../redux/slices/superAdminSlice";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import Loader from "../../components/Loader";

// ================== Memoized User Card ==================
const UserCard = React.memo(({ item }) => (
    <View style={styles.card}>
        <View style={styles.headerRow}>
            <Ionicons
                name="person-circle-outline"
                size={32}
                color="#6C63FF"
                style={{ marginRight: 10 }}
            />
            <View>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.role}>{item.role}</Text>
            </View>
            <View
                style={[
                    styles.statusBadge,
                    { backgroundColor: item.status === "active" ? "#E0F8E0" : "#FFE0E0" },
                ]}
            >
                <Text
                    style={[
                        styles.statusText,
                        { color: item.status === "active" ? "#2E8B57" : "#D32F2F" },
                    ]}
                >
                    {item.status}
                </Text>
            </View>
        </View>

        <View style={styles.detailRow}>
            <Ionicons name="mail-outline" size={18} color="#666" />
            <Text style={styles.detailText}>{item.email}</Text>
        </View>

        <View style={styles.detailRow}>
            <Ionicons name="call-outline" size={18} color="#666" />
            <Text style={styles.detailText}>{item.phone}</Text>
        </View>

        <Text style={styles.date}>
            Joined: {new Date(item.createdAt).toLocaleDateString()}
        </Text>
    </View>
));

export default function ManageUsersScreen() {
    const dispatch = useDispatch();
    const { users, loading, error } = useSelector((state) => state.superAdmin);
    const [refreshing, setRefreshing] = React.useState(false);

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, [dispatch]);

    const onRefresh = React.useCallback(async () => {
        setRefreshing(true);
        try {
            await dispatch(fetchAllUsers());
        } finally {
            setRefreshing(false);
        }
    }, [dispatch]);

    if (loading && !refreshing)
        return <Loader />;

    if (error)
        return (
            <View style={styles.center}>
                <Text style={{ color: "red" }}>Error: {error.message}</Text>
            </View>
        );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Manage Users</Text>

            <FlatList
                data={users}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => <UserCard item={item} />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 50 }}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                windowSize={5}
                removeClippedSubviews={true}
                refreshing={refreshing}
                onRefresh={onRefresh}
                ListEmptyComponent={
                    <Text style={styles.emptyText}>No users found.</Text>
                }
            />
        </View>
    );
}


// ================== Styles ==================
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffffff",
        paddingHorizontal: 16,
        paddingTop: 50,
    },
    title: {
        fontSize: 24,
        fontWeight: "700",
        color: "#333",
        marginBottom: 12,
    },
    card: {
        backgroundColor: "#fff",
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 4,
        elevation: 3,
    },
    headerRow: {
        flexDirection: "row",
        alignItems: "center",
    },
    name: {
        fontSize: 18,
        fontWeight: "600",
        color: "#222",
    },
    role: {
        fontSize: 14,
        color: "#6C63FF",
        marginTop: 2,
    },
    statusBadge: {
        marginLeft: "auto",
        paddingVertical: 4,
        paddingHorizontal: 10,
        borderRadius: 12,
    },
    statusText: {
        fontSize: 12,
        fontWeight: "500",
        textTransform: "capitalize",
    },
    detailRow: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 8,
    },
    detailText: {
        marginLeft: 8,
        fontSize: 14,
        color: "#555",
    },
    date: {
        fontSize: 12,
        color: "#999",
        marginTop: 8,
    },
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyText: {
        textAlign: "center",
        color: "#777",
        marginTop: 20,
    },
});
