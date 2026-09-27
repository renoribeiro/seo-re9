/**
 * Plain-language copy for Google OAuth failures, shared by the connect-surface
 * inline alert (GoogleLinkErrorAlert) and the /auth-error fallback page.
 * `code` is the `error` query param Better Auth appends on its error
 * redirects.
 *
 * `providerLabel` ("Search Console" / "Google Analytics") is set when the
 * failure came from a connect flow; without it the copy reads as a Google
 * sign-in failure.
 */
export function googleAuthErrorCopy(
  code: string,
  providerLabel?: string,
): { title: string; description: string } {
  // Concordância de gênero: "conexão" é feminino, "login" é masculino.
  const what = providerLabel
    ? {
        noun: `Conexão com o ${providerLabel}`,
        done: "concluída",
        canceled: "cancelada",
      }
    : { noun: "Login com o Google", done: "concluído", canceled: "cancelado" };

  switch (code) {
    case "state_mismatch":
      return {
        title: `${what.noun} não ${what.done}`,
        description:
          "A tentativa expirou ou foi interrompida. Tente de novo em uma única aba do navegador e conclua as etapas do Google em até 10 minutos. Se continuar acontecendo, confira se o seu navegador permite cookies para este site.",
      };
    case "access_denied":
      return {
        title: `${what.noun} ${what.canceled}`,
        description:
          "A tela de permissão do Google foi fechada ou recusada. Tente de novo quando quiser.",
      };
    case "account_already_linked_to_different_user":
      return {
        title: "Conta Google já conectada",
        description: providerLabel
          ? `Entre com o usuário do RE9 SEO que fez a vinculação, abra o seletor de propriedades do ${providerLabel} e escolha Remover conta ao lado da conta Google. Depois, vincule-a aqui.`
          : "Essa conta Google já está vinculada a outro usuário do RE9 SEO. Entre com esse usuário ou fale com o suporte.",
      };
    default:
      return {
        title: `${what.noun} não ${what.done}`,
        description:
          "Algo deu errado na comunicação com o Google. Tente novamente — se continuar falhando, fale com o suporte.",
      };
  }
}
