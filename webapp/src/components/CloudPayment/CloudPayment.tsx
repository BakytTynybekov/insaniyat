// /* eslint-disable @typescript-eslint/no-explicit-any */
// // src/components/CloudPayments.tsx

// declare global {
//   interface Window {
//     cp: any;
//   }
// }

// export const CloudPayments = {
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   init: (publicId: string) => {
//     if (!window.cp) {
//       const script = document.createElement("script");
//       script.src = "https://widget.cloudpayments.ru/bundles/cloudpayments";
//       document.body.appendChild(script);
//     }
//   },

//   charge: (options: {
//     publicId: string;
//     description: string;
//     amount: number;
//     currency: string;
//     accountId?: string;
//     email?: string;
//     requireConfirmation: boolean;
//     onSuccess?: (response: any) => void;
//     onFailure?: (reason: any) => void;
//   }) => {
//     CloudPayments.init(options.publicId);

//     const widget = new window.cp.CloudPayments();
//     const paymentData = {
//       publicId: options.publicId,
//       description: options.description,
//       amount: options.amount,
//       currency: options.currency,
//       accountId: options.accountId,
//       email: options.email,
//     };

//     if (options.requireConfirmation) {
//       widget.charge(
//         paymentData,
//         (response: any) => options.onSuccess?.(response),
//         (reason: any) => options.onFailure?.(reason)
//       );
//     } else {
//       widget.charge(
//         paymentData,
//         (response: any) => options.onSuccess?.(response),
//         (reason: any) => options.onFailure?.(reason)
//       );
//     }
//   },
// };
