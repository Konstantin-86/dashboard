import { useState } from 'react';
import { FaUserPlus, FaSpinner, FaImage, FaCloudUploadAlt, FaUpload, FaTimesCircle } from "react-icons/fa";
import { supabase } from '../lib/supabaseClient';
import MyInput from '../UI/MyInput';
import type { Person } from '../../types/types';
import type { FormEvent } from 'react';
import MyButton from '../UI/MyButton';

import styles from '../../styles/Personals/AddPerson.module.css';

interface FormData extends Omit<Person, 'id' | 'created_at' | 'photourl'> {
    photofile?: File | null;
}

const AddPerson = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        fullname: '',
        phone: '',
        telegram: '',
        birthdate: '',
        hiredate: '',
        color: '#3b82f6',
        photofile: null
    });
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            // Создаем preview
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewUrl(reader.result as string);
            };
            reader.readAsDataURL(file);

            setFormData({ ...formData, photofile: file });
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setUploading(true);
        setError(null);

        try {
            let photourl = null;

            if (formData.photofile) {
                const fileExt = formData.photofile.name.split('.').pop();
                const fileName = `${crypto.randomUUID()}.${fileExt}`;
                const filePath = `user_uploads/${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('user_uploads')
                    .upload(filePath, formData.photofile);

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from('user_uploads')
                    .getPublicUrl(filePath);

                photourl = publicUrl;
            }

            const personData = {
                fullname: formData.fullname,
                phone: formData.phone,
                telegram: formData.telegram,
                birthdate: formData.birthdate ? new Date(formData.birthdate).toISOString() : null,
                hiredate: formData.hiredate ? new Date(formData.hiredate).toISOString() : null,
                color: formData.color,
                photourl
            };

            const { error: insertError } = await supabase
                .from('persons')
                .insert(personData);

            if (insertError) throw insertError;

            setFormData({
                fullname: '',
                phone: '',
                telegram: '',
                birthdate: '',
                hiredate: '',
                color: '#3b82f6',
                photofile: null
            });
            setPreviewUrl(null);
            setIsOpen(false);

            alert('Сотрудник успешно добавлен!');

        } catch (err) {
            console.error('Error:', err);
            setError(err.message || 'Произошла ошибка при добавлении сотрудника');
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className={styles.wrapper}>


            <button
                className={styles.addButton}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Добавить сотрудника"
            >
                <FaUserPlus size={40} color="var(--accent)" />
            </button>

            {isOpen && (
                <div className={styles.modal}>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <button className={styles.closeButton} onClick={() => setIsOpen(false)}><FaTimesCircle /></button>
                        <h3 className={styles.title}>Новый сотрудник</h3>

                        {error && <div className={styles.error}>{error}</div>}

                        <MyInput
                            name="fullname"
                            type="text"
                            placeholder="Полное имя"
                            value={formData.fullname}
                            onChange={handleInputChange}
                            required
                        />

                        <MyInput
                            name="phone"
                            type="tel"
                            placeholder="Телефон"
                            value={formData.phone}
                            onChange={handleInputChange}
                            required
                        />

                        <MyInput
                            name="telegram"
                            type="text"
                            placeholder="Telegram"
                            value={formData.telegram}
                            onChange={handleInputChange}
                            required
                        />

                        <MyInput
                            name="birthdate"
                            type="date"
                            placeholder="Дата рождения"
                            value={formData.birthdate}
                            onChange={handleInputChange}
                            label="Дата рождения"
                            required
                        />

                        <MyInput
                            name="hiredate"
                            type="date"
                            placeholder="Дата приема"
                            value={formData.hiredate}
                            onChange={handleInputChange}
                            label="Дата приема"
                            required
                        />

                        <div className={styles.fileInput}>
                            {previewUrl ? <label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className={styles.hiddenInput}
                                    id="photo-upload"
                                />
                                <div className={styles.uploadArea}>
                                    {previewUrl ? (
                                        <img
                                            src={previewUrl}
                                            alt="Preview"
                                            className={styles.previewImage}
                                        />
                                    ) : (
                                        <span>Загрузить фото</span>
                                    )}
                                </div>
                            </label>
                                :
                                <label className={styles.uploadLabel}>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className={styles.hiddenInput}
                                        id="photo-upload"
                                    />
                                    <span className={styles.uploadButton}>Загрузите фото</span>
                                    <FaUpload />

                                </label>
                            }


                        </div>

                        <MyButton
                            type="submit"
                            variant='accent'
                            disabled={uploading}
                            className={styles.submitButton}
                        >
                            {uploading ? <span className={styles.spinner}></span> : 'Добавить сотрудника'}
                        </MyButton>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AddPerson;