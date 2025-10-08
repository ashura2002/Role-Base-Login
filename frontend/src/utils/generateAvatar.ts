export function generateAvatar(name: string): string {
    if (!name || name.trim() === "") {
        return "/images/avatar.png"; // Fallback to local avatar image
    }

    const backgroundColor = "023E8A"; // Blue accent
    const textColor = "FFFFFF"; // White text for contrast

    return `https://ui-avatars.com/api/?name=${encodeURIComponent(
        name
    )}&background=${backgroundColor}&color=${textColor}`;
}