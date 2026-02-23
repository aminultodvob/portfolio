// API base URL - in dev the Vite proxy forwards /api to localhost:5000
const BASE = "/api";

const getToken = () => localStorage.getItem("admin_token");

const headers = (isJson = true): Record<string, string> => {
    const h: Record<string, string> = {};
    if (isJson) h["Content-Type"] = "application/json";
    const t = getToken();
    if (t) h["Authorization"] = `Bearer ${t}`;
    return h;
};

async function request<T>(method: string, path: string, body?: unknown): Promise<T> {
    const res = await fetch(`${BASE}${path}`, {
        method,
        headers: headers(),
        body: body ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) {
        const err = await res.json().catch(() => ({ message: "Request failed" }));
        throw new Error(err.message || "Request failed");
    }
    return res.json();
}

export type CommunitySection = "humanitarian" | "startup" | "university";

export interface CommunityItem {
    _id?: string;
    section: CommunitySection;
    title: string;
    description?: string;
    imageUrl?: string;
    tag?: string;
    order?: number;
}

export const api = {
    // Auth
    login: (email: string, password: string) =>
        request<{ token: string; email: string }>("POST", "/auth/login", { email, password }),
    verify: () => request<{ valid: boolean; email: string }>("GET", "/auth/verify"),

    // About
    getAbout: () => request<Record<string, unknown>>("GET", "/about"),
    updateAbout: (data: unknown) => request<Record<string, unknown>>("PUT", "/about", data),

    // Projects
    getProjects: () => request<unknown[]>("GET", "/projects"),
    createProject: (data: unknown) => request<unknown>("POST", "/projects", data),
    updateProject: (id: string, data: unknown) => request<unknown>("PUT", `/projects/${id}`, data),
    deleteProject: (id: string) => request<unknown>("DELETE", `/projects/${id}`),

    // Experiences
    getExperiences: () => request<unknown[]>("GET", "/experiences"),
    createExperience: (data: unknown) => request<unknown>("POST", "/experiences", data),
    updateExperience: (id: string, data: unknown) => request<unknown>("PUT", `/experiences/${id}`, data),
    deleteExperience: (id: string) => request<unknown>("DELETE", `/experiences/${id}`),

    // Skills
    getSkills: () => request<unknown[]>("GET", "/skills"),
    createSkill: (data: unknown) => request<unknown>("POST", "/skills", data),
    updateSkill: (id: string, data: unknown) => request<unknown>("PUT", `/skills/${id}`, data),
    deleteSkill: (id: string) => request<unknown>("DELETE", `/skills/${id}`),

    // Awards
    getAwards: () => request<unknown[]>("GET", "/awards"),
    createAward: (data: unknown) => request<unknown>("POST", "/awards", data),
    updateAward: (id: string, data: unknown) => request<unknown>("PUT", `/awards/${id}`, data),
    deleteAward: (id: string) => request<unknown>("DELETE", `/awards/${id}`),

    // Publications
    getPublications: () => request<unknown[]>("GET", "/publications"),
    createPublication: (data: unknown) => request<unknown>("POST", "/publications", data),
    updatePublication: (id: string, data: unknown) => request<unknown>("PUT", `/publications/${id}`, data),
    deletePublication: (id: string) => request<unknown>("DELETE", `/publications/${id}`),

    // Research
    getResearch: () => request<unknown[]>("GET", "/research"),
    createResearch: (data: unknown) => request<unknown>("POST", "/research", data),
    updateResearch: (id: string, data: unknown) => request<unknown>("PUT", `/research/${id}`, data),
    deleteResearch: (id: string) => request<unknown>("DELETE", `/research/${id}`),

    // Community Contribution
    getCommunity: () => request<CommunityItem[]>("GET", "/community"),
    createCommunityItem: (data: unknown) => request<CommunityItem>("POST", "/community", data),
    updateCommunityItem: (id: string, data: unknown) => request<CommunityItem>("PUT", `/community/${id}`, data),
    deleteCommunityItem: (id: string) => request<unknown>("DELETE", `/community/${id}`),
};
