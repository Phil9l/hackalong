export class StringUtils {

    static toKebabCase(value = ''): string {
        return value.replace(/([a-z])([A-Z])/g, '$1-$2').replace(/\s+/g, '-').toLowerCase()
    }
}
