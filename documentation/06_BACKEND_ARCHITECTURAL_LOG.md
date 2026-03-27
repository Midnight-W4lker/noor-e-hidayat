# Backend Architecture Implementation Log
**Date:** October 26, 2023
**Architect:** Noor-e-Hidayat Engineering Team

## 1. Overview
To support the "Offline-First" requirement while enabling complex features like Authentication, Khutbah Management, and Masjid Registration, we have implemented a **Local-First Simulated Backend**.

## 2. Technology Strategy
Instead of a remote Node.js server, we use a Service Class (`MockBackendService`) that interfaces with the browser's `localStorage`. This acts as a persistent NoSQL database.

### Data Models
- **Users**: Stored in `nh_users`. Supports roles: `guest`, `imam`, `super_admin`.
- **Masjids**: Stored in `nh_masjids`. Includes verification status.
- **Khutbahs**: Stored in `nh_khutbahs`. Linked to `authorId`.
- **Session**: Stored in `nh_current_user_session`.

## 3. Authentication Flow
1. **Guest Mode**: Default state. Read-only access to Quran, Hadith, and Masjid Finder.
2. **Login**:
   - Input: Email.
   - Logic: Checks `nh_users`.
   - Success: Writes user object to `nh_current_user_session`.
   - Failure: Returns specific error.
3. **RBAC (Role-Based Access Control)**:
   - `KhutbahBuilder`: Protected route. Only visible if `role === 'imam' | 'super_admin'`.
   - `MasjidManager`: View mode for all; Register mode for `user` (pending verification).

## 4. Optimization for Pakistan
- **Latency**: Zero (Local operations).
- **Data Saving**: No network calls for DB operations.
- **Resilience**: App works completely offline after initial load.

## 5. Future Migration
This structure mirrors a standard REST API service layer. To migrate to NestJS later, we simply swap the methods in `mockBackend.ts` to use `fetch()` instead of `localStorage.getItem()`.
