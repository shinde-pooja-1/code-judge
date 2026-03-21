export async function apiRequest(url, options = {}) {
  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      },
    });

    console.log("api res", res);

    const contentType = res.headers.get("content-type") || "";

    if (!contentType.includes("application/json")) {
      const text = await res.text();
      console.log("Non-JSON response:", text);

      return {
        error: `Expected JSON but received ${contentType || "unknown content type"}`,
      };
    }

    const data = await res.json();

    if (!res.ok) {
      return {
        error:
          data?.error ||
          data?.message ||
          `Request failed with status ${res.status}`,
      };
    }

    if (data?.error) {
      return {
        error: data?.error || data?.message || "Something went wrong",
      };
    }

    return data?.data ?? data;
  } catch (error) {
    return {
      error:
        error?.message === "Failed to fetch"
          ? "Network error. Please check your internet connection."
          : error?.message || "Something went wrong",
    };
  }
}

export async function postData(url = null, data = null) {
  if (
    data === null ||
    data === undefined ||
    (Array.isArray(data) && data.length === 0) ||
    (typeof data === "object" && Object.keys(data).length === 0)
  )
    return { error: "invalid data" };

  if (!url) return { error: "invalid api" };

  return apiRequest(url, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getData(url, options = {}) {
  return apiRequest(url, {
    method: "GET",
    ...options,
  });
}

export async function getDataById(url, id) {
  return apiRequest(`${url}?id=${encodeURIComponent(id)}`, {
    method: "GET",
  });
}
