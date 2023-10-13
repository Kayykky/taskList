import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next'
import { parseCookies, destroyCookie } from 'nookies';
import { AuthTokenError } from '../services/errors/AuthTokenError';

export function canSSRAuth<P>(fn: GetServerSideProps<P>){
    return async (ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<P>> => {
        const cookies = parseCookies(ctx)

        if(!cookies['@tasklist.token']){
            return {
                redirect: {
                    destination: '/',
                    permanent: false
                }
            }
        }

        try {
            return await fn(ctx)
        } catch (error) {
            if(error instanceof AuthTokenError){
                destroyCookie(ctx, '@tasklist.token')
            }

            return {
                redirect: {
                    destination: '/',
                    permanent: false
                }
            }
        }
    }
}