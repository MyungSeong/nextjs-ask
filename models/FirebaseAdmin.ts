import * as admin from 'firebase-admin';

interface Config {
    credentials: {
        projectId: string;
        clientEmail: string;
        privateKey: string;
    };
}

export default class FirebaseAdmin {
    public static instance: FirebaseAdmin;

    private init = false;

    public static getInstance(): FirebaseAdmin {
        if (!FirebaseAdmin.instance) {
            // 초기화 진행
            FirebaseAdmin.instance = new FirebaseAdmin();
            // 환경 초기화
            FirebaseAdmin.instance.bootstrap();
        }

        return FirebaseAdmin.instance;
    }

    private bootstrap(): void {
        if (admin.apps.length !== 0) {
            this.init = true;
        }

        const config: Config = {
            credentials: {
                projectId: process.env.PROJECT_ID || '',
                clientEmail: process.env.CLIENT_EMAIL || '',
                privateKey: (process.env.PRIVATE_KEY || '').replace(/\\n/g, '\n'),
            },
        };

        try {
            admin.initializeApp({ credential: admin.credential.cert(config.credentials) });

            console.info('bootstrap firebase admin init success');
        } catch (error) {
            console.error('bootstrap firebase admin init failed', error);
        }
    }

    /**
     * FireStore 반환
     * @date 2023. 8. 17. - 오후 12:31:46
     * @author 김명성
     *
     * @public
     * @returns {FirebaseFirestore.Firestore}
     */
    public get Firebase(): FirebaseFirestore.Firestore {
        if (this.init === false) {
            this.bootstrap();
        }

        return admin.firestore();
    }

    public get Auth(): admin.auth.Auth {
        if (this.init === false) {
            this.bootstrap();
        }

        return admin.auth();
    }
}
