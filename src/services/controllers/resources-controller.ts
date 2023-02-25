import { ResourcesApi } from '../../utils/api/resources-api';
import { handleChatErrors } from '../../utils/util-functions/api/handle-errors';
import { IFile } from '../../components/chat-content/chat-content';

export class ResourcesController {
  private resourcesApi = new ResourcesApi();

  public async uploadFile(file: File): Promise<IFile> {
    const formData = new FormData();
    formData.append('resource', file);
    try {
      const response = await this.resourcesApi.uploadFile(formData);
      return JSON.parse(response.data);
    } catch (e) {
      handleChatErrors(e, 'Upload File');
    }
  }
}
