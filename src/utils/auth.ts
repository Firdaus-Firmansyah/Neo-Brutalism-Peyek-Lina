const TOKEN_KEY = "peyek_lina_admin_token";

/**
 * Menyimpan token JWT ke localStorage
 */
export const setToken = (token: string) => {
  localStorage.setItem(TOKEN_KEY, token);
};

/**
 * Mengambil token JWT dari localStorage
 */
export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * Menghapus token JWT dari localStorage (Logout)
 */
export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

/**
 * Simulasi pemanggilan API Login
 * Menerima email dan password, mengembalikan token JWT dummy jika berhasil.
 * Akan men-throw error jika kredensial salah.
 */
export const loginApi = async (email: string, password: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    // Simulasi network delay
    setTimeout(() => {
      if (email === "admin@business.com" && password === "admin123") {
        // Dummy JWT token
        resolve("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFkbWluIFBleWVrIExpbmEiLCJpYXQiOjE1MTYyMzkwMjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c");
      } else {
        reject(new Error("Email atau password salah!"));
      }
    }, 800);
  });
};
