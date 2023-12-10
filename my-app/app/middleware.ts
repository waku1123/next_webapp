import { authMiddleware, clerkClient, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from 'next/server';

export default authMiddleware({
  // 公開ルートを指定 (利用規約はログイン画面などログイン不要でアクセスできルート)
  publicRoutes: ["/"],
  async afterAuth(auth, req) {
    if (!auth.userId && auth.isPublicRoute) {
      return;
    }

    // ログインしていない場合はログイン画面にリダイレクト
    if (!auth.userId) && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    // セッションにオンボーディングの完了ステータスがあるか確認
    let onboarded = auth.sessionClaims?.onboarded;

    if (!onboarded) {
      // セッションになければClerkユーザー情報からステータスを取得
      const user = await clerkClient.users.getUser(auth.userId!);
      onboardedn user.publicMetadata.onboarded;
    }
    
    // オンボーディングが完了していない場合はオンボーディング画面にリダイレクト
    if (!onboarded && req.nextUrl.pathname !== '/onboarding') {
      const orgSelection = new URL('/onboarding', req.url);
      return NextResponse.redirect(orgSelection);
    }
    
    // オンボーディングが完了している場合は次のミドルウェアに進む
    if (onboarded && req.nextUrl.pathname === '/onboarding') {

      const orgSelection = new URL('/', req.url);
      return NextResponse.redirect(orgSelection);
    }
  },
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
