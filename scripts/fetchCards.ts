// fetch-cards.ts
import fetch from "node-fetch";
import { writeFileSync } from "fs";

const url = "https://cdn.playthebazaar.com/bazaardesigndataprod/cards.json";
const accessToken = "Bearer eyJhbGciOiJBMjU2S1ciLCJlbmMiOiJBMjU2Q0JDLUhTNTEyIiwidHlwIjoiYXQrand0IiwiY3R5IjoiSldUIn0.w83RJuztoFIV7iErTX2ROrU8_qrrmoF2wgSrZZ8RWECtcvW8yExz17HxCDn3IyDr3VetX7TzhrrlVbKHHDBcRgIHEfwTcK1Y.585MsMREBDlOSVIuPAy7gA.vp5JfzYageq3xqqgnFskQY8gukAnHH64JdZOOCOAixSoFPsWVp4R1g23a8y9gB2hisPpbECso1F7msD5rNvEyA8NWqWarIqGWvVetwoAF4XnCK_EyzSgRFAnSTGhRejZUw_9GHs0OppQJ8lHewzq0HZGu2bBSIMPhpE9xUEqtH5nrVgbHoWxf0nJKysI5pWerxhNOnpH26m8bixC8ZmUesgk3J4fQx3WBcxtHWrCXTd2V4xE0dIVK9EyC3oKR0XiGXLR3JNmxiStKGcfyMMqpQB6c-adMRT33OChjOMp_rDq06ose2lUym-yg3BI957u0ncSb7hsDQcS4hIemZil6q-bNMAFP-yFzGIJ7DbHT3d8AY5TayWUfmQ8PVCOHFdtFCk8yesmuo6JqasrxaHDK4qBsQGaNxgXKNnVrlOlQBlfBMDnwGofNk3wKI4lyYuFKrjKspDN9qmP9T8zejuSjz28U_uWPJhWX6ZPuAkRrz2__DgW8vRo8RCBHoNrtktglUUtJn5BHqX4bEvMKRyv8Jhnx8ILqcjkPJXkqCH6PASjHelLksh___LIEdyOv0pc8tMfEA2ox6Kxjkh6ViVq6RK0FH9AhuUZdD3c3jX6WMoiFQaR7a0o9KR53lRDjoLedWIlyzNp4VQH7Fd4sEvN0zocapBS_MwRwQF790EzwAOf1maftOIxuzsw_2b5cnEOiZOE0zv4M-_xdHooQvy9X1fRKJ6KfPVFfk-G_rr1osblqNd9HQfN2rLqVG36EPPWiEkwgH2BP11m4aDYidf_WkWatqfMqq5XIVSomawfOJmEgG8YGFxdRYOiOvtPFt0YWk_UPuKrWkLK-SW5t5gjuWlGt0OpIAGPGQHeqnWdSd6-n1u_K5ET0ZfV-RNun2HxuNpDda9mt2IvMuURLFguVFRz-YWBuQHiIb-nmkGdBj1U3Am0ymE3c0usncDwB1BYgOTlAOoxt6Uj2FZ1leIqD9fld5vhTmjMjzNtvA96rzFtFlZFOhrFv6dh-zUihU7HHdfFj-dE8LrOJYQ4B1zzfNaAnr-9VDg4JodcJY-TDKbs7h-hUIixDFdxxgApq762atbEKjzsqas2dKSF9G1SD5tT5lv-vjwsd92t9GiAcRxtZRuA1JtfZJEUU9bqIYip.T1LSKGVU2gU-LR6qDtnVxMZ21sfU7LAq0Obd8V_y-I4";

async function fetchAndSaveCards() {
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        // 'X-Access-Token': accessToken,
        // Or try: 'x-access-token': accessToken
      },
    });

    if (!response.ok) {
      throw new Error(`Fetch failed with ${response.status}: ${response.statusText}`);
    }

    const data = await response.json();
    writeFileSync("cards.json", JSON.stringify(data, null, 2));
    console.log("✅ cards.json downloaded successfully.");
  } catch (error) {
    console.error("❌ Error:", (error as Error).message);
  }
}

fetchAndSaveCards();
