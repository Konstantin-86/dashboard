import React, { useState, useRef } from 'react';
import { StorageService } from '../lib/storageService';
import { supabase } from '../lib/supabaseClient';
import MyButton from '../UI/MyButton';

interface PersonData {
    fullname: string;
    phone: string;
    telegram: string;
    birthdate: string;
    hiredate: string;
    color: string;
    photofile?: File | null;
}
interface PersonDB {
    fullname: string;
    phone: string;
    telegram: string;
    birthdate: string;
    hiredate: string;
    color: string;
    photourl?: string;
}
interface Person {
    id: number;
    fullname: string;
    phone: string;
    telegram: string;
    birthdate: string;
    hiredate: string;
    color: string;
    photourl: string | null;
    created_at: string;
}

const ImageUploader: React.FC = () => {
    const [formData, setFormData] = useState<PersonData>({
        fullname: 'asdfas',
        phone: '+79510332231',
        telegram: '@test',
        birthdate: new Date().toISOString().slice(0, 10),
        hiredate: new Date().toISOString(),
        color: '#3b82f6',
    });
    const [uploading, setUploading] = useState(false);

    const [persons, setPersons] = useState<Person[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPersons = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('persons')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;

            setPersons(data as Person[]);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    console.log("persons", persons[0]);




    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFormData({ ...formData, photofile: e.target.files[0] });
        }
    };
    console.log(formData);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUploading(true);

        try {
            let photourl = '';

            // 1. Загружаем изображение если есть
            if (formData.photofile) {
                const fileExt = formData.photofile.name.split('.').pop();
                const fileName = `${Math.random()}.${fileExt}`;
                const filePath = `user_uploads/${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('user_uploads')
                    .upload(filePath, formData.photofile);

                if (uploadError) throw uploadError;

                // Получаем публичный URL
                const { data: { publicUrl } } = supabase.storage
                    .from('user_uploads')
                    .getPublicUrl(filePath);

                photourl = publicUrl;
            }

            // 2. Подготавливаем данные для БД (без photofile)
            const personData: any = {
                fullname: formData.fullname,
                phone: formData.phone,
                telegram: formData.telegram,
                birthdate: new Date(formData.birthdate).toISOString(),
                hiredate: new Date(formData.hiredate).toISOString(),
                color: formData.color,
                photourl: photourl || null // Добавляем URL или null
            };

            // 3. Сохраняем данные персоны
            const { data, error } = await supabase
                .from('persons')
                .insert([personData])
                .select();

            if (error) throw error;

            alert('Person created successfully!');
        } catch (error) {
            console.error('Error:', error);
            alert('Error creating person');
        } finally {
            setUploading(false);
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="space-y-4">
                {/* Поля формы */}
                <input
                    type="text"
                    placeholder="Full Name"
                    value={formData.fullname}
                    onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                    required
                />

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                />


                <button
                    type="submit"
                    disabled={uploading}
                >
                    {uploading ? 'Uploading...' : 'Create Person'}
                </button>
            </form>
            <MyButton onClick={fetchPersons} variant='primary' size='large' fullWidth>Запрос</MyButton>
            <img src={persons[0]?.photourl} alt="photourl" />
        </>
    );
};

export default ImageUploader;