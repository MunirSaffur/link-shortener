import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { UrlTable } from '../components/UrlTable';
import { deleteUrl, getUrls, increaseUrlClickCount } from '../services/services';
import { UrlItem } from '../services/types';
import { Button } from 'antd';
import { CreateUrlModal } from '../components/CreateUrlModal';

export const Home = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [urls, setUrls] = useState<UrlItem[]>([])
    const [isLoading, setLoading] = useState(true)
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        fetchUrls();
    }, []);

    const fetchUrls = async () => {
        try {
            const data = await getUrls();
            setUrls(data);
        } catch (e) {
            console.error('Failed to fetch URLs:', e);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (record: UrlItem) => {
        setLoading(true);
        try {
            await deleteUrl(record.shortCode)
            await fetchUrls()
        } catch (e) {
            console.error('Failed to delete URL:', e);
        }

    };

    const increaseUrlClick = async (record: UrlItem) =>{
        await increaseUrlClickCount(record.id)
        await fetchUrls()
    }

    return (
        <div style={{ padding: 20 }}>
            <h2>Home Page</h2>
            {user ? (
                <>
                    <p>Welcome back, <strong>{user.email}</strong>!</p>
                </>
            ) : (
                <p>Welcome, Guest! Feel free to explore.</p>
            )}
            <Button type="primary" onClick={() => setModalOpen(true)}>
                Create Short URL
            </Button>

            <CreateUrlModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onCreated={() => fetchUrls()}
            />
            <div style={{ padding: 20 }}>
                <UrlTable
                    isLoading={isLoading}
                    data={urls}
                    onDelete={handleDelete}
                    onUrlClick={increaseUrlClick}
                />
            </div>
        </div>
    );
};
