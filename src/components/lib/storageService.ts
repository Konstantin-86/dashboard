import { supabase } from './supabaseClient';

const BUCKET_NAME = 'images';

export const StorageService = {
    // Загрузка изображения
    async uploadImage(file: File, path: string): Promise<string> {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${path}/${fileName}`;

        const { data, error } = await supabase.storage
            .from(BUCKET_NAME)
            .upload(filePath, file);

        if (error) throw error;
        return filePath;
    },

    // Получение публичного URL
    getPublicUrl(filePath: string): string {
        const { data } = supabase.storage
            .from(BUCKET_NAME)
            .getPublicUrl(filePath);

        return data.publicUrl;
    },

    // Удаление изображения (только для админов)
    async deleteImage(filePath: string): Promise<void> {
        const { error } = await supabase.storage
            .from(BUCKET_NAME)
            .remove([filePath]);

        if (error) throw error;
    },

    // Список файлов в папке
    async listFiles(folder: string): Promise<string[]> {
        const { data, error } = await supabase.storage
            .from(BUCKET_NAME)
            .list(folder);

        if (error) throw error;
        return data.map(file => `${folder}/${file.name}`);
    }
};