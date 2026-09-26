import os
from typing import Any

import httpx

from app.core.config import settings


class N8NClient:
    def __init__(self):
        self.base_url = settings.N8N_BASE_URL.rstrip("/")
        self.api_key = settings.N8N_API_KEY
        self.api_version = settings.N8N_API_VERSION

    def _request(self, method: str, path: str, **kwargs: Any):
        if not self.base_url or not self.api_key:
            raise RuntimeError("Faltan variables de entorno de n8n: N8N_BASE_URL y N8N_API_KEY")

        url = f"{self.base_url}/api/{self.api_version}{path}"
        headers = {
            "Accept": "application/json",
            "Content-Type": "application/json",
            "X-N8N-API-KEY": self.api_key,
        }
        headers.update(kwargs.pop("headers", {}))
        return httpx.request(method=method, url=url, headers=headers, **kwargs)

    def get_workflows(self):
        response = self._request("GET", "/workflows")
        response.raise_for_status()
        return response.json()

    def get_workflow(self, workflow_id: str):
        response = self._request("GET", f"/workflows/{workflow_id}")
        response.raise_for_status()
        return response.json()

    def activate_workflow(self, workflow_id: str):
        response = self._request("POST", f"/workflows/{workflow_id}/activate")
        response.raise_for_status()
        return response.json()

    def get_credentials(self):
        response = self._request("GET", "/credentials")
        response.raise_for_status()
        return response.json()

    def create_credential(self, payload: dict):
        response = self._request("POST", "/credentials", json=payload)
        response.raise_for_status()
        return response.json()

    def test_credential(self, credential_id: str):
        response = self._request("POST", f"/credentials/{credential_id}/test")
        response.raise_for_status()
        return response.json()


n8n_client = N8NClient()
