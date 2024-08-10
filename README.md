# Postman API Platform 기반 UI 설계 및 기능 구현

이 프로젝트는 Postman API Platform을 기반으로 하는 UI 설계와 기본 기능 구현을 목표로 합니다. JSONPlaceholder의 무료 Fake REST API와 연계하여 HTTP 요청과 관련된 다양한 작업을 수행할 수 있습니다.

## 목차
1. [컴포넌트별 기본 UI 디자인 및 레이아웃 구현](#컴포넌트별-기본-ui-디자인-및-레이아웃-구현)
   - [Workspace UI 구현](#workspace-ui-구현)
   - [Collection 및 Folder UI 구현](#collection-및-folder-ui-구현)
   - [Request UI 구현](#request-ui-구현)
2. [기본 기능 구현](#기본-기능-구현)
   - [Workspace 관리 기능 개발](#workspace-관리-기능-개발)
   - [Collection 및 Folder 추가, 기능 확장](#collection-및-folder-추가-기능-확장)
3. [기타 기능](#기타-기능)

## 컴포넌트별 기본 UI 디자인 및 레이아웃 구현

### Workspace UI 구현
- **Workspace 레이아웃 구성 및 UI 디자인 작업**
- **'New' 버튼 구현**
  - 추가로 새로운 Workspace를 생성하는 기능을 구현합니다.
- **'Import' 버튼 구현**
  - Workspace JSON 파일을 불러오는 기능을 구현합니다.
- **'Export' 버튼 구현**
  - 작성된 내용을 JSON 파일로 내보내는 기능을 구현합니다.

### Collection 및 Folder UI 구현
- **Collection 레이아웃 구성 및 UI 디자인 작업**
- **'Collection 추가' 버튼 구현**
  - 새로운 Collection을 생성하는 기능을 구현합니다.
- **Context 메뉴 기능 구현**
  - Collection의 특정 아이콘을 클릭 시 나타나는 Move, Add Folder, Add Request, Delete, Run 메뉴를 구현합니다.
- **Collection 및 Folder 이름과 설명 입력 및 저장 기능 구현**
- **위치 정보 표시 기능 추가**

### Request UI 구현
- **Request 레이아웃 구성 및 UI 디자인 작업**
- **'Request 추가' 버튼 구현**
  - Collection을 선택한 후 새로운 Request를 생성하는 기능을 구현합니다.
- **Request 이름 입력 및 HTTP 메서드 선택 기능 추가**
- **Request 탭 구성 (Params, Headers, Body)**
  - Params 탭에서 매개변수 추가 및 삭제 기능 구현
  - Body 탭에서 form-data와 raw type 변경 기능 구현

## 기본 기능 구현

### Workspace 관리 기능 개발
- **'New' 버튼 기능 개발**
  - 사용자가 새로운 Workspace를 추가할 수 있는 기능 개발.
- **'Import' 버튼 기능 개발**
  - 사용자가 Workspace JSON 파일을 불러올 수 있는 기능 개발.
  - 파일 선택 다이얼로그와 파일 처리 로직을 구현.
- **'Export' 버튼 기능 개발**
  - 작성된 내용을 JSON 파일로 만들어주는 기능 개발.

### Collection 및 Folder 추가, 기능 확장
- **'Collection 추가' 버튼 개발**
  - 사용자가 새로운 Collection을 추가할 수 있는 기능 개발.
- **Context 메뉴 기능 개발**
  - Collection의 아이콘을 클릭하면 Context 메뉴가 나타나고, Move, Add Folder, Add Request, Delete, Run 메뉴를 보여주는 기능 개발.
- **Collection, Folder 이름 및 설명 수정 기능 추가**
  - Collection 또는 Folder의 이름과 설명을 수정할 수 있는 기능 개발.
  - Save 버튼을 누르면 수정된 사항이 반영되도록 구현.
- **위치 정보 표시 기능 추가**

## 기타 기능
- **Run History**
  - Request 실행 이력 관리를 위한 Run History 기능 구현.
