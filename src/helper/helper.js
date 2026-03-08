export async function apiRequest(url, options = {}) {
  try {
    let res = await fetch(url, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      },
    });
    console.log("api res", res);
    res = await res.json();
    if (res?.error) {
      return {
        error: res?.error || res?.message || `Request failed with status`,
      };
    }

    return res?.data ?? res;
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

export async function getData(url) {
  return apiRequest(url, {
    method: "GET",
  });
}

export async function getDataById(url, id) {
  return apiRequest(`${url}?id=${encodeURIComponent(id)}`, {
    method: "GET",
  });
}
