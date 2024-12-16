export function getExtension(fileName: string): string {
    return fileName.split('.').pop() || '';
}